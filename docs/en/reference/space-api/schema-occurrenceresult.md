# OccurrenceResult



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `run_status` | Yes | string |   |
| `fetched_at` | Yes | string |  format: <code>"date-time"</code> |
| `error` | Yes | object / null |  additionalProperties: <code>false</code> |
| `final_message` | Yes | object / null |  additionalProperties: <code>false</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "run_status",
    "fetched_at",
    "error",
    "final_message"
  ],
  "properties": {
    "run_status": {
      "type": "string"
    },
    "fetched_at": {
      "type": "string",
      "format": "date-time"
    },
    "error": {
      "type": "object",
      "nullable": true,
      "additionalProperties": false,
      "required": [
        "code",
        "message",
        "phase"
      ],
      "properties": {
        "code": {
          "type": "string"
        },
        "message": {
          "type": "string"
        },
        "phase": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "final_message": {
      "type": "object",
      "nullable": true,
      "additionalProperties": false,
      "required": [
        "id",
        "text",
        "created_at"
      ],
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid"
        },
        "text": {
          "type": "string"
        },
        "created_at": {
          "type": "string",
          "format": "date-time"
        }
      }
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
