# SandboxConfiguration



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `env_from` | Да | array&lt;string&gt; |   |
| `env_names` | Да | array&lt;string&gt; |   |
| `template` | Да | string |   |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "env_from": {
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
    "env_from"
  ],
  "title": "SandboxConfiguration",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
