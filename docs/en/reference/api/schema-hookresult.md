# HookResult



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `env_names` | Yes | array&lt;string&gt; / null | Sorted names passed by Orpheus for the confirmed start of this hook script. Null if unknown.  |
| `id` | Yes | string |  format: <code>"uuid"</code> |
| `name` | Yes | string |  enum: <code>["after_create","before_run","after_run","before_remove"]</code> |
| `status` | Yes | string |  enum: <code>["pending","running","completed","failed","cancelled","skipped"]</code> |
| `started_at` | Yes | string / null |   |
| `deadline_at` | Yes | string / null |   |
| `finished_at` | Yes | string / null |   |
| `exit_code` | Yes | integer / null |   |
| `signal` | Yes | integer / null |   |
| `output` | Yes | [TextResult](schema-textresult.md) / [TruncatedResult](schema-truncatedresult.md) / null |   |
| `output_completeness` | Yes | string |  enum: <code>["complete","truncated","unavailable","unknown"]</code> |
| `truncation_reason` | Yes | string / null |   |
| `error` | Yes | [Error](schema-error.md) / null |   |

## JSON Schema

```json
{
  "properties": {
    "env_names": {
      "description": "Sorted names passed by Orpheus for the confirmed start of this hook script. Null if unknown.",
      "anyOf": [
        {
          "type": "array",
          "uniqueItems": true,
          "items": {
            "type": "string"
          }
        },
        {
          "type": "null"
        }
      ]
    },
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
    "env_names",
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

[All schemas](schemas.md) · [HTTP API](index.md)
