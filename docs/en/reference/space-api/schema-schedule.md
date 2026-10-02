# Schedule



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `url` | Yes | string / null | Absolute Space Web card URL from ORPHEUS_PUBLIC_URL, or null when not configured. Computed at response time. format: <code>"uri"</code> |
| `name` | Yes | string |  minLength: <code>1</code><br>maxLength: <code>200</code> |
| `prompt` | Yes | string |  minLength: <code>1</code> |
| `cron` | Yes | string |  minLength: <code>1</code> |
| `timezone` | Yes | string |  minLength: <code>1</code> |
| `status` | Yes | [Status](schema-status.md) |   |
| `model` | Yes | string / null |  minLength: <code>1</code> |
| `session_mode` | Yes | [SessionMode](schema-sessionmode.md) |   |
| `owner_email` | Yes | string / null |  minLength: <code>1</code> |
| `env_from` | Yes | [EnvFrom](schema-envfrom.md) |   |
| `id` | Yes | string |  format: <code>"uuid"</code> |
| `created_at` | Yes | string |  format: <code>"date-time"</code> |
| `updated_at` | Yes | string |  format: <code>"date-time"</code> |
| `next_run_at` | Yes | string / null |  format: <code>"date-time"</code> |
| `deleted_at` | Yes | string / null |  format: <code>"date-time"</code> |
| `last_occurrence` | Yes | [NullableOccurrence](schema-nullableoccurrence.md) |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "id",
    "url",
    "name",
    "prompt",
    "cron",
    "timezone",
    "status",
    "model",
    "session_mode",
    "owner_email",
    "env_from",
    "created_at",
    "updated_at",
    "next_run_at",
    "deleted_at",
    "last_occurrence"
  ],
  "properties": {
    "url": {
      "type": "string",
      "format": "uri",
      "nullable": true,
      "description": "Absolute Space Web card URL from ORPHEUS_PUBLIC_URL, or null when not configured. Computed at response time."
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
    },
    "prompt": {
      "type": "string",
      "minLength": 1
    },
    "cron": {
      "type": "string",
      "minLength": 1
    },
    "timezone": {
      "type": "string",
      "minLength": 1
    },
    "status": {
      "$ref": "#/components/schemas/Status"
    },
    "model": {
      "type": "string",
      "nullable": true,
      "minLength": 1
    },
    "session_mode": {
      "$ref": "#/components/schemas/SessionMode"
    },
    "owner_email": {
      "type": "string",
      "nullable": true,
      "minLength": 1
    },
    "env_from": {
      "$ref": "#/components/schemas/EnvFrom"
    },
    "id": {
      "type": "string",
      "format": "uuid"
    },
    "created_at": {
      "type": "string",
      "format": "date-time"
    },
    "updated_at": {
      "type": "string",
      "format": "date-time"
    },
    "next_run_at": {
      "type": "string",
      "format": "date-time",
      "nullable": true
    },
    "deleted_at": {
      "type": "string",
      "format": "date-time",
      "nullable": true
    },
    "last_occurrence": {
      "$ref": "#/components/schemas/NullableOccurrence"
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
