import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
const [repo, ref, component = 'orpheus'] = process.argv.slice(2)
if (!repo || !ref || ref.startsWith('-') || !['orpheus', 'orpheus-space'].includes(component)) throw Error('Usage: node scripts/sync-api.mjs /path/to/repo vX.Y.Z [orpheus|orpheus-space]')
const commit = execFileSync('git', ['-C', repo, 'rev-parse', '--verify', `${ref}^{commit}`], {encoding:'utf8'}).trim()
const raw = execFileSync('git', ['-C', repo, 'show', `${commit}:api/openapi.yaml`], {encoding:'utf8'})
const lock = JSON.parse(readFileSync('api/upstream.json','utf8'))
lock[component].tag = ref
lock[component].commit = commit
const space = component === 'orpheus-space'
lock[space ? 'space_openapi_sha256' : 'openapi_sha256'] = createHash('sha256').update(raw).digest('hex')
writeFileSync(space ? 'api/space.openapi.yaml' : 'api/openapi.yaml',raw)
writeFileSync('api/upstream.json',JSON.stringify(lock,null,2)+'\n')
console.log(`Exported ${component} ${ref} (${commit}). Review examples and translations, then run npm run api:generate.`)
