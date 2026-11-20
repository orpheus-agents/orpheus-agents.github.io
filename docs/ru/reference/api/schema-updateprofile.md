# UpdateProfile



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `account_id` | Нет | string |  format: <code>"uuid"</code> |
| `description` | Нет | string / null |  maxLength: <code>4096</code> |
| `model` | Нет | string |  minLength: <code>1</code><br>maxLength: <code>255</code> |
| `instructions` | Нет | string |  maxLength: <code>65536</code> |
| `opencode` | Нет | object / null |  additionalProperties: <code>false</code> |
| `codex` | Нет | object / null |  additionalProperties: <code>false</code> |
| `active` | Нет | boolean |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [],
  "properties": {
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
    "opencode": {
      "type": [
        "object",
        "null"
      ],
      "additionalProperties": false,
      "properties": {
        "variant": {
          "type": [
            "string",
            "null"
          ],
          "minLength": 1,
          "maxLength": 255
        }
      }
    },
    "codex": {
      "type": [
        "object",
        "null"
      ],
      "additionalProperties": false,
      "properties": {
        "effort": {
          "type": [
            "string",
            "null"
          ],
          "enum": [
            "none",
            "minimal",
            "low",
            "medium",
            "high",
            "xhigh",
            "max",
            "ultra",
            null
          ]
        },
        "summary": {
          "type": [
            "string",
            "null"
          ],
          "enum": [
            "auto",
            "concise",
            "detailed",
            "none",
            null
          ]
        },
        "personality": {
          "type": [
            "string",
            "null"
          ],
          "enum": [
            "none",
            "friendly",
            "pragmatic",
            null
          ]
        },
        "service_tier": {
          "type": [
            "string",
            "null"
          ],
          "minLength": 1
        }
      }
    },
    "active": {
      "type": "boolean"
    }
  },
  "x-go-type": "json.RawMessage",
  "minProperties": 1
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
