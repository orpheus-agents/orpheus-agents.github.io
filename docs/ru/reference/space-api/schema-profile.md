# Profile



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `name` | Да | string |   |
| `description` | Да | string / null |   |
| `harness` | Да | string |  enum: <code>["codex"]</code> |
| `model` | Да | string / null |   |
| `codex` | Да | [CodexProfile](schema-codexprofile.md) |   |
| `instructions` | Да | string |   |
| `is_default` | Да | boolean |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "name",
    "description",
    "harness",
    "model",
    "codex",
    "instructions",
    "is_default"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string",
      "nullable": true
    },
    "harness": {
      "type": "string",
      "enum": [
        "codex"
      ]
    },
    "model": {
      "type": "string",
      "nullable": true
    },
    "codex": {
      "$ref": "#/components/schemas/CodexProfile"
    },
    "instructions": {
      "type": "string"
    },
    "is_default": {
      "type": "boolean"
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
