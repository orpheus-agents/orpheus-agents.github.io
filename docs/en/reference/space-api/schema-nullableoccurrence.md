# NullableOccurrence



**Type:** object / null additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `id` | Yes | string |  format: <code>"uuid"</code> |
| `schedule_id` | Yes | string |  format: <code>"uuid"</code> |
| `scheduled_at` | Yes | string |  format: <code>"date-time"</code> |
| `state` | Yes | [OccurrenceState](schema-occurrencestate.md) |   |
| `created_at` | Yes | string |  format: <code>"date-time"</code> |
| `updated_at` | Yes | string |  format: <code>"date-time"</code> |
| `session_id` | Yes | string / null |  format: <code>"uuid"</code> |
| `run_id` | Yes | string / null |  format: <code>"uuid"</code> |
| `run_status` | Yes | string / null |   |
| `observed_at` | Yes | string / null |  format: <code>"date-time"</code> |
| `execution_started_at` | Yes | string / null |  format: <code>"date-time"</code> |
| `finished_at` | Yes | string / null |  format: <code>"date-time"</code> |
| `run_error_code` | Yes | string / null |   |
| `sync_error_code` | Yes | string / null |   |
| `error_code` | Yes | string / null |   |
| `attempts` | Yes | integer |  minimum: <code>0</code> |
| `next_attempt_at` | Yes | string / null |  format: <code>"date-time"</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "id",
    "schedule_id",
    "scheduled_at",
    "state",
    "created_at",
    "updated_at",
    "session_id",
    "run_id",
    "run_status",
    "observed_at",
    "execution_started_at",
    "finished_at",
    "run_error_code",
    "sync_error_code",
    "error_code",
    "attempts",
    "next_attempt_at"
  ],
  "properties": {
    "id": {
      "type": "string",
      "format": "uuid"
    },
    "schedule_id": {
      "type": "string",
      "format": "uuid"
    },
    "scheduled_at": {
      "type": "string",
      "format": "date-time"
    },
    "state": {
      "$ref": "#/components/schemas/OccurrenceState"
    },
    "created_at": {
      "type": "string",
      "format": "date-time"
    },
    "updated_at": {
      "type": "string",
      "format": "date-time"
    },
    "session_id": {
      "type": "string",
      "nullable": true,
      "format": "uuid"
    },
    "run_id": {
      "type": "string",
      "nullable": true,
      "format": "uuid"
    },
    "run_status": {
      "type": "string",
      "nullable": true
    },
    "observed_at": {
      "type": "string",
      "nullable": true,
      "format": "date-time"
    },
    "execution_started_at": {
      "type": "string",
      "nullable": true,
      "format": "date-time"
    },
    "finished_at": {
      "type": "string",
      "nullable": true,
      "format": "date-time"
    },
    "run_error_code": {
      "type": "string",
      "nullable": true
    },
    "sync_error_code": {
      "type": "string",
      "nullable": true
    },
    "error_code": {
      "type": "string",
      "nullable": true
    },
    "attempts": {
      "type": "integer",
      "minimum": 0
    },
    "next_attempt_at": {
      "type": "string",
      "nullable": true,
      "format": "date-time"
    }
  },
  "nullable": true
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
