# HookResult



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `id` | Да | string |  format: <code>"uuid"</code> |
| `name` | Да | string |  enum: <code>["after_create","before_run","after_run","before_remove"]</code> |
| `status` | Да | string |  enum: <code>["pending","running","completed","failed","cancelled","skipped"]</code> |
| `started_at` | Да | string / null |   |
| `deadline_at` | Да | string / null |   |
| `finished_at` | Да | string / null |   |
| `exit_code` | Да | integer / null |   |
| `signal` | Да | integer / null |   |
| `output` | Да | [TextResult](schema-textresult.md) / [TruncatedResult](schema-truncatedresult.md) / null |   |
| `output_completeness` | Да | string |  enum: <code>["complete","truncated","unavailable","unknown"]</code> |
| `truncation_reason` | Да | string / null |   |
| `error` | Да | [Error](schema-error.md) / null |   |

## JSON Schema

```json
{
  "properties": {
    "id": {
      "type": "string",
      "format": "uuid"
    },
    "name": {
      "type": "string",
      "enum": [
        "after_create",
        "before_run",
        "after_run",
        "before_remove"
      ]
    },
    "status": {
      "type": "string",
      "enum": [
        "pending",
        "running",
        "completed",
        "failed",
        "cancelled",
        "skipped"
      ]
    },
    "started_at": {
      "anyOf": [
        {
          "type": "string",
          "format": "date-time"
        },
        {
          "type": "null"
        }
      ]
    },
    "deadline_at": {
      "anyOf": [
        {
          "type": "string",
          "format": "date-time"
        },
        {
          "type": "null"
        }
      ]
    },
    "finished_at": {
      "anyOf": [
        {
          "type": "string",
          "format": "date-time"
        },
        {
          "type": "null"
        }
      ]
    },
    "exit_code": {
      "anyOf": [
        {
          "type": "integer"
        },
        {
          "type": "null"
        }
      ]
    },
    "signal": {
      "anyOf": [
        {
          "type": "integer"
        },
        {
          "type": "null"
        }
      ]
    },
    "output": {
      "anyOf": [
        {
          "$ref": "#/components/schemas/TextResult"
        },
        {
          "$ref": "#/components/schemas/TruncatedResult"
        },
        {
          "type": "null"
        }
      ]
    },
    "output_completeness": {
      "type": "string",
      "enum": [
        "complete",
        "truncated",
        "unavailable",
        "unknown"
      ]
    },
    "truncation_reason": {
      "anyOf": [
        {
          "type": "string",
          "enum": [
            "orpheus_limit"
          ]
        },
        {
          "type": "null"
        }
      ]
    },
    "error": {
      "anyOf": [
        {
          "$ref": "#/components/schemas/Error"
        },
        {
          "type": "null"
        }
      ]
    }
  },
  "required": [
    "id",
    "name",
    "status",
    "started_at",
    "deadline_at",
    "finished_at",
    "exit_code",
    "signal",
    "output",
    "output_completeness",
    "truncation_reason",
    "error"
  ],
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
