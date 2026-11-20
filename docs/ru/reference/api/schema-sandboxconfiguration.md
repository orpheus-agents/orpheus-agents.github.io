# SandboxConfiguration



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `services` | Да | [ServiceCodes](schema-servicecodes.md) |   |
| `env_from` | Да | array&lt;string&gt; | Отсортированные имена ENV worker, явно запрошенных для этой сессии.  |
| `env_names` | Да | array&lt;string&gt; | Отсортированные имена ENV, значения которых переданы явно для сессии.  |
| `template` | Да | string |   |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "services": {
      "$ref": "#/components/schemas/ServiceCodes"
    },
    "env_from": {
      "description": "Sorted worker variable names explicitly requested for the session.",
      "items": {
        "type": "string"
      },
      "title": "Env From",
      "type": "array"
    },
    "env_names": {
      "description": "Sorted names of explicit session env values.",
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
