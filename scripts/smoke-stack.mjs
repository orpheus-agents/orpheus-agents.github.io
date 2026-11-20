import { mkdtempSync, cpSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawn, spawnSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { parse, stringify } from 'yaml'

const temp = mkdtempSync(join(tmpdir(), 'orpheus-docs-smoke-'))
const project = `orpheus-docs-smoke-${process.pid}`
const upstream = JSON.parse(readFileSync('api/upstream.json','utf8'))
const env = { ...process.env, POSTGRES_PASSWORD: 'fixture-password', ENV_ENCRYPTION_KEY: 'Zm9yLWxvY2FsLWRldmVsb3BtZW50LW9ubHktMzJieXQ=', AGENTBOX_API_KEY: 'fixture', MATTERMOST_BOT_TOKEN: 'fixture', ORPHEUS_API_KEY: 'fixture', ORPHEUS_VERSION: upstream.orpheus.tag.slice(1), ORPHEUS_MATTERMOST_VERSION: upstream['orpheus-mattermost'].tag.slice(1), ORPHEUS_WEB_VERSION: upstream['orpheus-web'].tag.slice(1) }
Object.assign(env, { ORPHEUS_SPACE_API_KEY: 'space-fixture', ORPHEUS_BASE_URL: '', ORPHEUS_SPACE_VERSION: upstream['orpheus-space'].tag.slice(1), ORPHEUS_SPACE_WEB_VERSION: upstream['orpheus-space-web'].tag.slice(1) })
Object.assign(env, { ORPHEUS_SPACE_CORE_NETWORK: `${project}-bridge`, ORPHEUS_SPACE_CORE_API_KEY: 'space-core-fixture' })
// Each project reads its own .env. Do not inherit the caller's Compose selection.
delete env.COMPOSE_FILE
const spaceEnv = { ...env }
let bridgeCreated = false
function run(command, args, capture = false, cwd = temp, commandEnv = env) {
  return new Promise((resolve, reject) => {
    const p = spawn(command, args, { cwd, env: commandEnv, stdio: capture ? ['ignore', 'pipe', 'inherit'] : 'inherit' })
    let result = ''
    if (capture) p.stdout.on('data', chunk => result += chunk)
    p.on('error', reject)
    p.on('exit', code => code === 0 ? resolve(result.trim()) : reject(Error(`${command} ${args.join(' ')} exited ${code}`)))
  })
}
const compose = (args, capture = false) => run('docker', ['compose', '-p', project, ...args], capture)
const spaceCompose = (args, capture = false) => run('docker', ['compose', '-p', `${project}-space`, ...args], capture, join(temp, 'space'), spaceEnv)
try {
  cpSync('examples/quickstart', temp, { recursive: true, filter: path => !['.env', 'orpheus.toml', 'workflows', '__pycache__'].includes(path.split('/').at(-1)) })
  cpSync('examples/space', join(temp, 'space'), { recursive: true, filter: path => path.split('/').at(-1) !== '.env' })
  await run('python3', ['init.py'])
  cpSync(join(temp, 'space/.env.example'), join(temp, 'space/.env'))
  const stack = parse(readFileSync(join(temp,'compose.yaml'),'utf8'))
  for (const service of Object.values(stack.services)) if (service.ports) service.ports = service.ports.map(p => '127.0.0.1::' + p.split(':').at(-1))
  writeFileSync(join(temp,'compose.yaml'), stringify(stack))
  // Load the GitLab example with the released connector. Network isolation makes
  // the first GitLab request fail only after configuration and workflows load.
  const reviewImage = `retailcrm/orpheus-gitlab-mr-review:${upstream['orpheus-gitlab-mr-review'].tag.slice(1)}`
  await run('docker', ['pull', '--platform', 'linux/amd64', reviewImage])
  cpSync('examples/gitlab-review/workflows', join(temp, 'gitlab-workflows'), { recursive: true })
  const review = spawnSync('docker', ['run', '--rm', '--network', 'none', '--platform', 'linux/amd64',
    '-e', 'GITLAB_BASE_URL=http://127.0.0.1:1', '-e', 'GITLAB_TOKEN=fixture',
    '-e', 'ORPHEUS_BASE_URL=http://127.0.0.1:1', '-e', 'ORPHEUS_API_KEY=fixture',
    '-e', 'WORKFLOWS_DIR=/var/app/workflows', '-e', 'HTTP_TIMEOUT_SECONDS=1',
    '-v', `${join(temp, 'gitlab-workflows')}:/var/app/workflows:ro`, reviewImage,
  ], { encoding: 'utf8', timeout: 30000 })
  if (review.status !== 1 || !review.stdout.includes('resolve authenticated GitLab reviewer')) {
    throw Error(`GitLab workflow did not pass startup validation: ${review.error ?? review.stdout + review.stderr}`)
  }
  console.log('Published GitLab connector accepted the example workflow with networking disabled.')
  // No core worker, connector server or model calls. Only isolated database/API checks.
  await compose(['run','--rm','--no-deps','mattermost','validate'])
  await compose(['up','-d','--wait','--wait-timeout','90','db','api','web'])
  for (const [service, port, path] of [['api','9100','/ready'],['web','8080','/'],['web','8080','/api/v1/sessions']]) {
    const address = await compose(['port',service,port], true)
    const response = await fetch(`http://${address}${path}`)
    if (!response.ok) throw Error(`${service}${path}: HTTP ${response.status}`)
    if (path.endsWith('sessions') && (await response.json()).items.length !== 0) throw Error('Smoke database must be empty')
  }
  const systemAddress = await compose(['port','api','9100'], true)
  const metrics = await fetch(`http://${systemAddress}/metrics/service`)
  if (!metrics.ok || !metrics.headers.get('content-type')?.startsWith('text/plain') || (await metrics.text()).trim() !== '') throw Error('API-key-only metrics must return successful empty Prometheus text')
  const publicAddress = await compose(['port','api','8000'], true)
  const publicMetrics = await fetch(`http://${publicAddress}/metrics/service`, { headers: { Authorization: 'Bearer fixture' } })
  if (publicMetrics.status !== 404) throw Error('Public API must not expose service metrics')
  const emptyTemplates = await fetch(`http://${publicAddress}/api/v1/templates`).then(r => r.json())
  if (emptyTemplates.items.length || emptyTemplates.next_cursor !== null || emptyTemplates.prev_cursor !== null) throw Error('A fresh installation must have an empty template catalog')
  for (const catalog of ['profiles', 'llm-accounts']) {
    const page = await fetch(`http://${publicAddress}/api/v1/${catalog}`).then(r => r.json())
    if (page.items.length || page.next_cursor !== null || page.prev_cursor !== null) throw Error(`Fresh ${catalog} catalog must be empty without legacy TOML`)
  }
  const createCatalog = async (path, body) => {
    const response = await fetch(`http://${publicAddress}/api/v1/${path}`, {
      method: 'POST', headers: { Authorization: 'Bearer fixture', 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    })
    if (response.status !== 201) throw Error(`Create ${path}: ${response.status} ${await response.text()}`)
    return response.json()
  }
  const account = await createCatalog('llm-accounts', { name: 'Docs smoke', harness: 'codex', auth_mode: 'api_key', api_key: 'fixture-model-key' })
  await createCatalog('profiles', { name: 'default', account_id: account.id, model: 'gpt-6-sol' })
  const httpMetrics = await fetch(`http://${systemAddress}/metrics`)
  if (!httpMetrics.ok || !(await httpMetrics.text()).includes('orpheus_http_requests_total')) throw Error('HTTP metrics must count API traffic')
  if ((await fetch(`http://${publicAddress}/metrics`)).status !== 404) throw Error('Public API must not expose HTTP metrics')
  const emptyAdmission = await fetch(`http://${publicAddress}/api/v1/sessions`, {
    method: 'POST',
    headers: { Authorization: 'Bearer fixture', 'Content-Type': 'application/json', 'Idempotency-Key': randomUUID() },
    body: readFileSync('examples/create-session.json', 'utf8'),
  })
  if (emptyAdmission.status !== 422 || (await emptyAdmission.json()).error.code !== 'unknown_template') throw Error('An empty catalog must reject new sessions')
  // Fixture only in this disposable database. The user registers an own-project
  // template through Web/API; this offline test must never contact AgentBox.
  const templateId = randomUUID()
  await compose(['exec', '-T', 'db', 'psql', '-U', 'orpheus', '-d', 'orpheus', '-v', 'ON_ERROR_STOP=1', '-c',
    `INSERT INTO templates (id, template_name, agentbox_template_id) VALUES ('${templateId}', 'codex', 'docs-smoke-fixture');`])
  const templateWeb = `http://${await compose(['port', 'web', '8080'], true)}/api/v1/templates/${templateId}`
  const patchTemplate = headers => fetch(templateWeb, { method: 'PATCH', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify({ description: 'Disposable smoke fixture' }) })
  if ((await patchTemplate({})).status !== 403) throw Error('Core browser writes must require Origin and CSRF')
  if ((await patchTemplate({ Origin: 'http://localhost:8085', 'X-Orpheus-CSRF': '1' })).status !== 200) throw Error('Configured core browser writes must succeed')
  console.log('Published images passed migrations, API readiness, service metrics isolation, web proxy and offline workflow validation.')
  const space = parse(readFileSync(join(temp, 'space/compose.yaml'), 'utf8'))
  for (const service of Object.values(space.services)) if (service.ports) service.ports = service.ports.map(p => '127.0.0.1::' + p.split(':').at(-1))
  writeFileSync(join(temp, 'space/compose.yaml'), stringify(space))
  await spaceCompose(['up', '-d', '--wait', '--wait-timeout', '90', 'db', 'api', 'web'])
  const spaceSystem = await spaceCompose(['port', 'api', '9100'], true)
  if (!(await fetch(`http://${spaceSystem}/ready`)).ok) throw Error('Space readiness failed')
  let origin = `http://${await spaceCompose(['port', 'web', '8080'], true)}`
  if (!(await fetch(origin)).ok) throw Error('Space web is unavailable')
  const request = async (path, options = {}, expected = 200) => {
    const response = await fetch(`${origin}${path}`, options)
    if (response.status !== expected) throw Error(`Space ${path}: expected ${expected}, got ${response.status}`)
    return response.status === 204 ? null : response.json()
  }
  const base = '/api/v1/schedules'
  const payload = readFileSync(join(temp, 'space/schedule.json'), 'utf8')
  const headers = { 'Content-Type': 'application/json', Origin: 'http://localhost:8086', 'X-Orpheus-CSRF': '1' }
  await request(base, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload }, 403)
  await request(base, { headers: { Authorization: 'Bearer invalid' } }, 401)
  if ((await request(base)).items.length !== 0) throw Error('Space smoke database must be empty')
  await request(base, { method: 'POST', headers, body: payload }, 503)
  const offlinePreview = await request(`${base}/preview`, { method: 'POST', headers, body: JSON.stringify({ cron: '0 10 * * 1-5', timezone: 'Europe/Moscow' }) })
  if (offlinePreview.times.length !== 5) throw Error('Space preview must work without core')
  console.log('Space published images passed readiness, reads, preview, Origin/CSRF and unavailable-catalog checks without core.')
  await run('docker', ['network', 'create', env.ORPHEUS_SPACE_CORE_NETWORK], true)
  bridgeCreated = true
  writeFileSync(join(temp, '.env'), readFileSync(join(temp, '.env'), 'utf8') + '\nCOMPOSE_FILE=compose.yaml:compose.space.yaml\n')
  const spaceDotenv = readFileSync(join(temp, 'space/.env'), 'utf8')
    .replace('ORPHEUS_BASE_URL=\n', 'ORPHEUS_BASE_URL=http://orpheus-core:8000\n')
    .replace('ORPHEUS_API_KEY=\n', 'ORPHEUS_API_KEY=space-core-fixture\n')
  writeFileSync(join(temp, 'space/.env'), spaceDotenv + '\nCOMPOSE_FILE=compose.yaml:compose.core.yaml\n')
  delete spaceEnv.ORPHEUS_BASE_URL
  delete spaceEnv.ORPHEUS_API_KEY
  await compose(['up', '-d', '--wait', '--force-recreate', 'api', 'web'])
  await spaceCompose(['up', '-d', '--wait', '--force-recreate', 'api', 'worker', 'web'])
  // Repeat the ordinary commands from setup/update, without -f or --env-file.
  await compose(['up', '-d', '--wait', 'api', 'web'])
  await spaceCompose(['up', '-d', '--wait', 'api', 'worker'])
  origin = `http://${await spaceCompose(['port', 'web', '8080'], true)}`
  // Both web proxies must still resolve their own API, despite identical service names.
  const coreWeb = await compose(['port', 'web', '8080'], true)
  const coreAuth = await fetch(`http://${coreWeb}/api/v1/auth/session`).then(r => r.json())
  const spaceAuth = await request('/api/v1/auth/session')
  if ('write_access' in coreAuth || spaceAuth.write_access !== true) throw Error('Web proxy resolved the wrong API')
  // These are new origin reads because Compose may replace containers with dynamic ports.
  const coreAPI = `http://${await compose(['port', 'api', '8000'], true)}`
  for (const key of ['fixture', 'space-core-fixture']) {
    if (!(await fetch(`${coreAPI}/api/v1/sessions`, { headers: { Authorization: `Bearer ${key}` } })).ok) throw Error('Core key not preserved or Space key missing')
  }
  const coreServices = await fetch(`${coreAPI}/api/v1/services`, { headers: { Authorization: 'Bearer fixture' } }).then(r => r.json())
  const services = await request('/api/v1/services')
  if (JSON.stringify(services) !== JSON.stringify(coreServices) || services.items.length !== 1 || services.items[0].code !== 'mattermost' || services.items[0].env_names.join() !== 'MATTERMOST_BOT_TOKEN,MATTERMOST_URL') throw Error('Root service catalog differs from the runnable example')
  for (const catalog of ['profiles', 'templates']) if (!(await request(`/api/v1/${catalog}`)).items.length) throw Error(`Empty ${catalog} catalog`)
  const profiles = await request('/api/v1/profiles?available=true&name=default&limit=1')
  if (profiles.items.length !== 1 || profiles.items[0].model !== 'gpt-6-sol' || profiles.next_cursor !== null || profiles.prev_cursor !== null) throw Error('Space did not preserve the available profile page')
  const templates = await request('/api/v1/templates?active=true&name=codex&limit=1')
  if (templates.items.length !== 1 || templates.items[0].active !== true || templates.next_cursor !== null || templates.prev_cursor !== null) throw Error('Space did not preserve the active template page')
  const settings = await request(`${base}/settings`)
  if (settings.browser_auth !== 'anonymous' || settings.default_template !== 'codex' || settings.default_profile !== 'default') throw Error('Unexpected Space settings')
  await request(base, { method: 'POST', headers, body: JSON.stringify({ ...JSON.parse(payload), services: ['missing'] }) }, 422)
  const schedule = await request(base, { method: 'POST', headers, body: payload }, 201)
  if (schedule.services.length || 'env_from' in schedule) throw Error('Example schedule must have explicit empty services')
  const selected = await request(`${base}/${schedule.id}`, { method: 'PATCH', headers, body: JSON.stringify({ services: ['mattermost'] }) })
  if (selected.services.join() !== 'mattermost') throw Error('Service selection was not stored')
  const cleared = await request(`${base}/${schedule.id}`, { method: 'PATCH', headers, body: JSON.stringify({ services: [] }) })
  if (cleared.services.length) throw Error('Service selection was not cleared')
  if (schedule.status !== 'paused' || schedule.next_run_at !== null) throw Error('Example schedule must stay paused')
  const filtered = await request(`${base}?owner_email=alice%40example.com`)
  if (filtered.items.length !== 1 || filtered.items[0].id !== schedule.id) throw Error('Space owner filter failed')
  await request(`${base}/${schedule.id}`, { method: 'PATCH', headers, body: JSON.stringify({ name: 'Edited report' }) })
  const history = await request(`${base}/${schedule.id}/occurrences`)
  if (history.items.length !== 0) throw Error('Paused schedule unexpectedly executed')
  const preview = await request(`${base}/preview`, { method: 'POST', headers, body: JSON.stringify({ cron: '0 10 * * 1-5', timezone: 'Europe/Moscow' }) })
  if (preview.times.length !== 5) throw Error('Space preview must return five occurrences')
  await request(`${base}/${schedule.id}`, { method: 'DELETE', headers }, 204)
  if ((await request(base)).items.length !== 0) throw Error('Deleted schedule remains in list')
  console.log('Space published images passed nginx CRUD, service catalogs, explicit selection, owner filtering and Origin/CSRF checks.')
  const probe = await request(base, { method: 'POST', headers, body: JSON.stringify({ name: 'Connection check', prompt: 'Reply SPACE_OK', services: ['mattermost'], cron: '* * * * *', timezone: 'UTC' }) }, 201)
  const deadline = Date.now() + 75000
  let occurrence
  while (Date.now() < deadline) {
    occurrence = (await request(`${base}/${probe.id}/occurrences`)).items[0]
    if (occurrence?.state === 'accepted') break
    if (occurrence?.state === 'failed') throw Error(`Space submission failed: ${occurrence.error_code}`)
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  if (occurrence?.state !== 'accepted' || !occurrence.run_id) throw Error('Space did not submit to local core')
  const session = await fetch(`${coreAPI}/api/v1/sessions/${occurrence.session_id}`, { headers: { Authorization: 'Bearer fixture' } }).then(r => r.json())
  if (session.configuration.sandbox.services.join() !== 'mattermost' || session.configuration.sandbox.env_from.length !== 0) throw Error('Space did not forward session service access to core')
  await request(`${base}/${probe.id}`, { method: 'DELETE', headers }, 204)
  console.log('Persistent COMPOSE_FILE selection, dedicated bridge, distinct core keys and Space worker submission passed. Core worker stayed stopped.')
} catch (error) {
  await spaceCompose(['logs', '--no-color', '--tail', '60']).catch(() => {})
  await compose(['logs', '--no-color', '--tail', '60']).catch(() => {})
  throw error
} finally {
  try { await spaceCompose(['--profile', 'execution', 'down', '-v', '--remove-orphans']) }
  finally {
    await compose(['down','-v','--remove-orphans'])
    if (bridgeCreated) await run('docker', ['network', 'rm', env.ORPHEUS_SPACE_CORE_NETWORK], true)
    rmSync(temp, { recursive: true, force: true })
  }
}
