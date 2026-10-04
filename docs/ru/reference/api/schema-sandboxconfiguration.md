# SandboxConfiguration



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `services` | Да | array&lt;[Service](schema-service.md)&gt; | Неизменяемые описания сервисов и имена ENV, определённые при принятии запроса.  |
| `env_from` | Да | array&lt;string&gt; | Отсортированные имена переменных окружения оркестратора, включая ENV выбранных сервисов.  |
| `env_names` | Да | array&lt;string&gt; |   |
| `template` | Да | string |   |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "services": {
      "description": "Immutable service descriptions and environment names resolved when accepted.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/Service"
      }
    },
    "env_from": {
      "description": "Sorted orchestrator environment variable names, including expanded services.",
      "items": {
        "type": "string"
      },
      "title": "Env From",
      "type": "array"
    },
    "env_names": {
      "items": {
        "type": "string"
      },
      "title": "Env Names",
      "type": "array"
    },
    "template": {
      "title": "Template",
      "type": "string"
    }
  },
  "required": [
    "template",
    "env_names",
    "env_from",
    "services"
  ],
  "title": "SandboxConfiguration",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
