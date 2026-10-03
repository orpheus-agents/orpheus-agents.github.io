import { mkdtempSync, cpSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import { parse, stringify } from 'yaml'

const temp = mkdtempSync(join(tmpdir(), 'orpheus-docs-smoke-'))
const project = `orpheus-docs-smoke-${process.pid}`
const upstream = JSON.parse(readFileSync('api/upstream.json','utf8'))
const env = { ...process.env, POSTGRES_PASSWORD: 'fixture-password', ENV_ENCRYPTION_KEY: 'Zm9yLWxvY2FsLWRldmVsb3BtZW50LW9ubHktMzJieXQ=', AGENTBOX_API_KEY: 'fixture', OPENAI_API_KEY: 'fixture', MATTERMOST_BOT_TOKEN: 'fixture', ORPHEUS_API_KEY: 'fixture', ORPHEUS_VERSION: upstream.orpheus.tag.slice(1), ORPHEUS_MATTERMOST_VERSION: upstream['orpheus-mattermost'].tag.slice(1), ORPHEUS_WEB_VERSION: upstream['orpheus-web'].tag.slice(1) }
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
  // No worker, connector server or model calls. Only local schema validation and read requests.
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
  const schedule = await request(base, { method: 'POST', headers, body: payload }, 201)
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
  console.log('Space published images passed nginx CRUD, catalog-backed creation, owner filtering and Origin/CSRF checks.')
  const probe = await request(base, { method: 'POST', headers, body: JSON.stringify({ name: 'Connection check', prompt: 'Reply SPACE_OK', cron: '* * * * *', timezone: 'UTC' }) }, 201)
  const deadline = Date.now() + 75000
  let occurrence
  while (Date.now() < deadline) {
    occurrence = (await request(`${base}/${probe.id}/occurrences`)).items[0]
    if (occurrence?.state === 'accepted') break
    if (occurrence?.state === 'failed') throw Error(`Space submission failed: ${occurrence.error_code}`)
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  if (occurrence?.state !== 'accepted' || !occurrence.run_id) throw Error('Space did not submit to local core')
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
