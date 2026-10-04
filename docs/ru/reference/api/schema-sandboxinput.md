# SandboxInput



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `env` | Нет | object |  additionalProperties: <code>{"type":"string"}</code> |
| `services` | Нет | [ServiceCodes](schema-servicecodes.md) | Сервисы для агента и хуков сессии. Их ENV объединяются с env_from.  |
| `env_from` | Нет | array&lt;string&gt; |   |
| `template` | Да | string |  minLength: <code>1</code> |

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
