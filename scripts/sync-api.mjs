import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
const [repo, ref] = process.argv.slice(2)
if (!repo || !ref || ref.startsWith('-')) throw Error('Usage: node scripts/sync-api.mjs /path/to/orpheus vX.Y.Z')
const commit = execFileSync('git', ['-C', repo, 'rev-parse', '--verify', `${ref}^{commit}`], {encoding:'utf8'}).trim()
const raw = execFileSync('git', ['-C', repo, 'show', `${commit}:api/openapi.yaml`], {encoding:'utf8'})
const lock = JSON.parse(readFileSync('api/upstream.json','utf8'))
lock.orpheus.tag = ref
lock.orpheus.commit = commit
lock.openapi_sha256 = createHash('sha256').update(raw).digest('hex')
writeFileSync('api/openapi.yaml',raw)
writeFileSync('api/upstream.json',JSON.stringify(lock,null,2)+'\n')
console.log(`Exported Orpheus ${ref} (${commit}). Review examples and translations, then run npm run api:generate.`)
