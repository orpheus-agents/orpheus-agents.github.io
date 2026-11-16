# SandboxInput



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `env` | Нет | object |  additionalProperties: <code>{"type":"string"}</code> |
| `services` | Нет | [ServiceCodes](schema-servicecodes.md) | Сервисы для агента и хуков сессии. Их ENV объединяются с env_from.  |
| `env_from` | Нет | array&lt;string&gt; |   |
| `template` | Да | string | Точное имя активного шаблона из каталога, включая team slug и тег, если они есть. Отсутствующая или неактивная запись возвращает 422 unknown_template с кодом детали template_not_found или template_inactive. Принятые сессии и идемпотентные повторы сохраняют имя независимо от последующих изменений каталога. minLength: <code>1</code> |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "env": {
      "additionalProperties": {
        "type": "string"
      },
      "title": "Env",
      "type": "object"
    },
    "services": {
      "description": "Services available to the agent and session hooks, expanded together with env_from.",
      "$ref": "#/components/schemas/ServiceCodes"
    },
    "env_from": {
      "items": {
        "type": "string"
      },
      "title": "Env From",
      "type": "array"
    },
    "template": {
      "description": "Exact active catalog name, including any team slug and tag. Missing or inactive records return 422 unknown_template with detail code template_not_found or template_inactive. Accepted sessions and idempotent replays keep their stored name regardless of subsequent catalog changes.",
      "minLength": 1,
      "title": "Template",
      "type": "string"
    }
  },
  "required": [
    "template"
  ],
  "title": "SandboxInput",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
