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
    "instructions"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "description": {
      "type": [
        "string",
        "null"
      ]
    },
    "harness": {
      "type": "string",
      "enum": [
        "codex"
      ]
    },
    "model": {
      "type": [
        "string",
        "null"
      ]
    },
    "codex": {
      "$ref": "#/components/schemas/CodexProfile"
    },
    "instructions": {
      "type": "string"
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
