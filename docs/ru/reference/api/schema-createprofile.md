# CreateProfile



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `name` | Да | string |  minLength: <code>1</code><br>maxLength: <code>255</code> |
| `account_id` | Да | string |  format: <code>"uuid"</code> |
| `description` | Нет | string / null |  maxLength: <code>4096</code> |
| `model` | Да | string |  minLength: <code>1</code><br>maxLength: <code>255</code> |
| `instructions` | Нет | string |  maxLength: <code>65536</code> |
| `codex` | Нет | [CodexProfile](schema-codexprofile.md) |   |
| `opencode` | Нет | [OpenCodeProfile](schema-opencodeprofile.md) |   |
| `active` | Нет | boolean |  default: <code>true</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "name",
    "account_id",
    "model"
  ],
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "account_id": {
      "type": "string",
      "format": "uuid"
    },
    "description": {
      "type": [
        "string",
        "null"
      ],
      "maxLength": 4096
    },
    "model": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "instructions": {
      "type": "string",
      "maxLength": 65536
    },
    "codex": {
      "$ref": "#/components/schemas/CodexProfile"
    },
    "opencode": {
      "$ref": "#/components/schemas/OpenCodeProfile"
    },
    "active": {
      "type": "boolean",
      "default": true
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
