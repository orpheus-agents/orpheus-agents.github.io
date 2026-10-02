import { readFileSync, readdirSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { parse } from 'yaml'
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'

const spec = parse(readFileSync('api/openapi.yaml', 'utf8'))
const upstream = JSON.parse(readFileSync('api/upstream.json', 'utf8'))
const exampleEnv = Object.fromEntries(readFileSync('examples/quickstart/.env.example', 'utf8').trim().split('\n').map(line => line.split('=')))
for (const [name, key] of [['orpheus','ORPHEUS_VERSION'],['orpheus-mattermost','ORPHEUS_MATTERMOST_VERSION'],['orpheus-web','ORPHEUS_WEB_VERSION']]) {
  if (exampleEnv[key] !== upstream[name].tag.slice(1)) throw Error(`Example image version differs from documentation source: ${name}`)
}
const ajv = new Ajv2020({ strict: false, allErrors: true })
addFormats(ajv)
ajv.addSchema({ $id: 'orpheus', components: spec.components })
const schemas = { 'create-session.json': 'CreateSession', 'create-run.json': 'CreateRun', 'send-message.json': 'SendMessage' }
for (const [file, schema] of Object.entries(schemas)) {
  const valid = ajv.validate({ $ref: `orpheus#/components/schemas/${schema}` }, JSON.parse(readFileSync(`examples/${file}`, 'utf8')))
  if (!valid) throw Error(`${file}: ${ajv.errorsText()}`)
}
const space = parse(readFileSync('api/space.openapi.yaml', 'utf8'))
ajv.addSchema({ $id: 'space', components: space.components })
if (!ajv.validate({ $ref: 'space#/components/schemas/CreateSchedule' }, JSON.parse(readFileSync('examples/space/schedule.json', 'utf8')))) throw Error(ajv.errorsText())
const spaceEnv = Object.fromEntries(readFileSync('examples/space/.env.example', 'utf8').trim().split('\n').map(line => line.split('=')))
for (const [name, key] of [['orpheus-space', 'ORPHEUS_SPACE_VERSION'], ['orpheus-space-web', 'ORPHEUS_SPACE_WEB_VERSION']]) {
  if (spaceEnv[key] !== upstream[name].tag.slice(1)) throw Error(`Space example image differs from documentation source: ${name}`)
}
function walk(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`]) }
const ru = walk('docs/ru').filter(p => p.endsWith('.md')).map(p => p.slice(8)).sort()
const en = walk('docs/en').filter(p => p.endsWith('.md')).map(p => p.slice(8)).sort()
if (JSON.stringify(ru) !== JSON.stringify(en)) throw Error('English and Russian page sets differ')
for (const path of [...walk('docs/ru'), ...walk('docs/en')].filter(p => p.endsWith('.md'))) {
  const source = readFileSync(path, 'utf8')
  for (const match of source.matchAll(/^```(json|toml|python)\n([\s\S]*?)^```/gm)) {
    if (match[1] === 'json') {
      try { JSON.parse(match[2]) } catch (error) { throw Error(`${path}: invalid JSON example: ${error.message}`) }
    } else {
      const code = match[1] === 'toml' ? 'import sys,tomllib; tomllib.loads(sys.stdin.read())' : 'import sys,ast; ast.parse(sys.stdin.read())'
      const result = spawnSync('python3', ['-c',code], {input: match[2], encoding:'utf8'})
      if (result.status !== 0) throw Error(`${path}: ${result.stderr}`)
    }
  }
}
// Execute the helpdesk admission example against a fake transport, then validate
// the captured payload against the real API contract. No external service calls.
const payload = spawnSync('python3', ['-c', `
import runpy, json, os, contextlib, io
from unittest.mock import patch
os.environ.update(ORPHEUS_URL='https://orpheus.example.com', ORPHEUS_API_KEY='fixture')
captured = []
class Response:
    def __enter__(self): return self
    def __exit__(self, *args): pass
    def read(self): return b'{}'
def send(request, timeout):
    captured.append(json.loads(request.data))
    return Response()
with patch('urllib.request.urlopen', send), contextlib.redirect_stdout(io.StringIO()):
    runpy.run_path('examples/helpdesk/create.py')
print(json.dumps(captured[0]))
`], { encoding: 'utf8' })
if (payload.status !== 0) throw Error(payload.stderr)
if (!ajv.validate({$ref: 'orpheus#/components/schemas/CreateSession'}, JSON.parse(payload.stdout))) throw Error(ajv.errorsText())
const python = spawnSync('python3', ['scripts/check-python-examples.py'], { stdio: 'inherit' })
if (python.status !== 0) process.exit(python.status ?? 1)
const compose = spawnSync('docker', ['compose','--env-file','.env.example','config','--quiet'], {
  cwd: 'examples/quickstart', encoding:'utf8',
  env: { ...process.env, POSTGRES_PASSWORD:'fixture-password', ENV_ENCRYPTION_KEY:'Zm9yLWxvY2FsLWRldmVsb3BtZW50LW9ubHktMzJieXQ=', ORPHEUS_API_KEY:'fixture', AGENTBOX_API_KEY:'fixture', OPENAI_API_KEY:'fixture', MATTERMOST_BOT_TOKEN:'fixture' },
})
if (compose.status !== 0) throw Error(compose.stderr || 'Docker Compose is required to validate the example')
const spaceCompose = spawnSync('docker', ['compose', '--env-file', '.env.example', '--profile', 'execution', 'config', '--quiet'], {
  cwd: 'examples/space', encoding: 'utf8',
  env: { ...process.env, POSTGRES_PASSWORD: 'fixture-password', ORPHEUS_SPACE_API_KEY: 'space-fixture' },
})
if (spaceCompose.status !== 0) throw Error(spaceCompose.stderr)
console.log(`Validated API payloads, code blocks, Compose and ${ru.length} translated page pairs.`)
