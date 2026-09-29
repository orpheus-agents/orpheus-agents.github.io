import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { parse } from 'yaml'

const check = process.argv.includes('--check')
const raw = readFileSync('api/openapi.yaml', 'utf8')
const lock = JSON.parse(readFileSync('api/upstream.json', 'utf8'))
if (createHash('sha256').update(raw).digest('hex') !== lock.openapi_sha256) throw Error('OpenAPI checksum mismatch. Update api/upstream.json with the reviewed source.')
const spec = parse(raw)
const translations = JSON.parse(readFileSync('api/translations.ru.json', 'utf8'))
const names = {
  get_account_limits: 'Лимиты аккаунтов', get_analytics_overview: 'Обзор аналитики',
  auth_session: 'Браузерная сессия', browser_login: 'Вход через SSO', browser_callback: 'Ответ SAML',
  browser_logout: 'Выход', saml_metadata: 'Метаданные SAML', list_all_runs: 'Все запуски',
  list_sessions: 'Список сессий', create_session: 'Создание сессии', get_session: 'Получение сессии',
  get_events: 'События сессии', stream_events: 'Поток событий SSE', get_history: 'История сессии',
  list_runs: 'Запуски сессии', create_run: 'Новый запуск', get_run: 'Получение запуска',
  cancel_run: 'Отмена запуска', send_message: 'Уточнение работающему агенту'
}
const esc = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('|', '&#124;').replaceAll('\n', ' ')
const slug = id => id.replaceAll('_', '-')
const refLink = ref => { const name = ref.split('/').at(-1); return `[${name}](schema-${name.toLowerCase()}.md)` }
function type(s = {}) {
  if (s.$ref) return refLink(s.$ref)
  if (s.anyOf || s.oneOf || s.allOf) return (s.anyOf || s.oneOf || s.allOf).map(type).join(' / ')
  if (s.type === 'array') return `array&lt;${type(s.items)}&gt;`
  return esc(Array.isArray(s.type) ? s.type.join(' / ') : s.type || 'any')
}
function detail(s = {}) {
  const fields = ['enum', 'const', 'default', 'format', 'minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'minLength', 'maxLength', 'minItems', 'maxItems', 'pattern', 'additionalProperties']
  return fields.filter(k => k in s).map(k => `${k}: <code>${esc(JSON.stringify(s[k]))}</code>`).join('<br>')
}
const generated = new Map()
for (const lang of ['ru', 'en']) {
  const ru = lang === 'ru'
  const base = `docs/${lang}/reference/api/`
  const describe = text => {
    if (!text) return ''
    if (ru) {
      if (!translations[text]) throw Error(`Missing Russian API translation: ${text}`)
      return esc(translations[text])
    }
    if (text === 'Reserved for future use; never called, including before automatic sandbox deletion.') return 'Accepted by the API but never executed, including before automatic sandbox deletion. Do not use for cleanup.'
    return esc(text)
  }
  const intro = ru ? 'Справочник построен из OpenAPI Orpheus. Описания переведены на русский. В блоках JSON Schema сохранён исходный контракт.' : 'Generated from the Orpheus OpenAPI contract. Usage guidance is provided in the integration guides.'
  const index = [`# HTTP API`, '', intro, '', ru ? '[Авторизация, ошибки и повторы](conventions.md) · [Пример интеграции](../../integrations/custom/first-session.md) · [Схемы данных](schemas.md)' : '[Authentication, errors and retries](conventions.md) · [Integration example](../../integrations/custom/first-session.md) · [Data schemas](schemas.md)', '', '[OpenAPI YAML](/openapi.yaml)', '', `| ${ru ? 'Метод | Адрес | Операция' : 'Method | Path | Operation'} |`, '| --- | --- | --- |']
  for (const [path, item] of Object.entries(spec.paths)) for (const [method, op] of Object.entries(item)) {
    if (!op.operationId) continue
    const title = ru ? names[op.operationId] : op.summary
    if (!title) throw Error(`Missing operation title: ${op.operationId}`)
    const file = `${slug(op.operationId)}.md`
    index.push(`| \`${method.toUpperCase()}\` | \`${path}\` | [${title}](${file}) |`)
    const lines = [`# ${title}`, '', '```http', `${method.toUpperCase()} ${path}`, '```', '', describe(op.description || op.summary), '', `**operationId:** \`${op.operationId}\``, '', `## ${ru ? 'Авторизация' : 'Authentication'}`, '']
    const security = op.security ?? spec.security ?? []
    lines.push(security.length ? security.map(s => Object.keys(s).join(' + ') || (ru ? 'Без авторизации' : 'Public')).join(' / ') : (ru ? 'Без авторизации API-ключом.' : 'No API key required.'))
    lines.push('', ru ? 'Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.' : 'See [browser access](../../operations/sso.md). Session mutations require a Bearer key.', '')
    const params = [...(item.parameters || []), ...(op.parameters || [])]
    if (params.length) {
      lines.push(`## ${ru ? 'Параметры' : 'Parameters'}`, '', `| ${ru ? 'Имя | Где | Обязательный | Тип | Описание и ограничения' : 'Name | In | Required | Type | Description and constraints'} |`, '| --- | --- | --- | --- | --- |')
      for (const p of params) lines.push(`| \`${p.name}\` | ${p.in} | ${p.required ? (ru ? 'Да' : 'Yes') : (ru ? 'Нет' : 'No')} | ${type(p.schema)} | ${describe(p.description || p.schema?.description)} ${detail(p.schema)} |`)
      lines.push('')
    }
    if (op.requestBody) {
      lines.push(`## ${ru ? 'Тело запроса' : 'Request body'}`, '')
      for (const [mime, body] of Object.entries(op.requestBody.content)) lines.push(`\`${mime}\`: ${type(body.schema)}`, '', '```json', JSON.stringify(body.schema, null, 2), '```', '')
    }
    lines.push(`## ${ru ? 'Ответы' : 'Responses'}`, '', `| ${ru ? 'Код | Описание | Содержимое' : 'Code | Description | Content'} |`, '| --- | --- | --- |')
    for (const [code, response] of Object.entries(op.responses)) {
      const content = Object.entries(response.content || {}).map(([mime, body]) => `\`${mime}\`: ${type(body.schema)}`).join('<br>')
      lines.push(`| ${code} | ${describe(response.description)} | ${content} |`)
    }
    for (const [code, response] of Object.entries(op.responses)) if (response.headers) {
      lines.push('', `### ${ru ? 'Заголовки ответа' : 'Response headers'} ${code}`, '')
      for (const [name,h] of Object.entries(response.headers)) lines.push(`- \`${name}\`: ${describe(h.description)} ${type(h.schema)}`)
    }
    lines.push('', '[HTTP API](index.md)')
    generated.set(base + file, lines.join('\n') + '\n')
  }
  generated.set(base + 'index.md', index.join('\n') + '\n')
  const schemaIndex = [`# ${ru ? 'Схемы данных' : 'Data schemas'}`, '', intro, '']
  for (const [name,s] of Object.entries(spec.components.schemas)) {
    schemaIndex.push(`- [${name}](schema-${name.toLowerCase()}.md)`)
    const schemas = [`# ${name}`, '', describe(s.description || ''), '', `**${ru ? 'Тип' : 'Type'}:** ${type(s)} ${detail(s)}`.trimEnd(), '']
    if (s.properties) {
      schemas.push(`| ${ru ? 'Поле | Обязательное | Тип | Описание и ограничения' : 'Field | Required | Type | Description and constraints'} |`, '| --- | --- | --- | --- |')
      for (const [field,p] of Object.entries(s.properties)) schemas.push(`| \`${field}\` | ${(s.required || []).includes(field) ? (ru ? 'Да' : 'Yes') : (ru ? 'Нет' : 'No')} | ${type(p)} | ${describe(p.description)} ${detail(p)} |`)
      schemas.push('')
    }
    schemas.push('## JSON Schema', '', '```json', JSON.stringify(s, null, 2), '```', '', `[${ru ? 'Все схемы' : 'All schemas'}](schemas.md) · [HTTP API](index.md)`)
    generated.set(base + `schema-${name.toLowerCase()}.md`, schemas.join('\n') + '\n')
  }
  generated.set(base + 'schemas.md', schemaIndex.join('\n') + '\n')
}
generated.set('docs/public/openapi.yaml', raw)
let failures = 0
for (const [path, text] of generated) {
  if (check) {
    let actual = ''; try { actual = readFileSync(path, 'utf8') } catch {}
    if (actual !== text) { console.error(`Stale or missing: ${path}`); failures++ }
  } else { mkdirSync(path.slice(0, path.lastIndexOf('/')), {recursive: true}); writeFileSync(path, text) }
}
for (const lang of ['ru','en']) {
  const dir = `docs/${lang}/reference/api/`
  for (const file of readdirSync(dir)) {
    if (file === 'conventions.md' || generated.has(dir+file)) continue
    if (check) { console.error(`Obsolete generated page: ${dir+file}`); failures++ }
    else rmSync(dir+file)
  }
}
if (failures) process.exitCode = 1
else console.log(`${check ? 'Checked' : 'Generated'} ${generated.size} API artifacts.`)
