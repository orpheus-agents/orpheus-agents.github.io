import { mkdtempSync, cpSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import { parse, stringify } from 'yaml'

const temp = mkdtempSync(join(tmpdir(), 'orpheus-docs-smoke-'))
const project = `orpheus-docs-smoke-${process.pid}`
const upstream = JSON.parse(readFileSync('api/upstream.json','utf8'))
const env = { ...process.env, POSTGRES_PASSWORD: 'fixture-password', ENV_ENCRYPTION_KEY: 'Zm9yLWxvY2FsLWRldmVsb3BtZW50LW9ubHktMzJieXQ=', AGENTBOX_API_KEY: 'fixture', OPENAI_API_KEY: 'fixture', MATTERMOST_BOT_TOKEN: 'fixture', ORPHEUS_API_KEY: 'fixture', ORPHEUS_VERSION: upstream.orpheus.tag.slice(1), ORPHEUS_MATTERMOST_VERSION: upstream['orpheus-mattermost'].tag.slice(1), ORPHEUS_WEB_VERSION: upstream['orpheus-web'].tag.slice(1) }
function run(command, args, capture = false) {
  return new Promise((resolve, reject) => {
    const p = spawn(command, args, { cwd: temp, env, stdio: capture ? ['ignore', 'pipe', 'inherit'] : 'inherit' })
    let result = ''
    if (capture) p.stdout.on('data', chunk => result += chunk)
    p.on('error', reject)
    p.on('exit', code => code === 0 ? resolve(result.trim()) : reject(Error(`${command} ${args.join(' ')} exited ${code}`)))
  })
}
const compose = (args, capture = false) => run('docker', ['compose', '-p', project, ...args], capture)
try {
  cpSync('examples/quickstart', temp, { recursive: true, filter: path => !['.env', 'orpheus.toml', 'workflows', '__pycache__'].includes(path.split('/').at(-1)) })
  await run('python3', ['init.py'])
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
} finally {
  await compose(['down','-v','--remove-orphans'])
  rmSync(temp, { recursive: true, force: true })
}
