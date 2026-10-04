# Schedule



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `can_edit` | Yes | boolean | Whether this caller may modify the current schedule. False for deleted schedules. Computed from current ownership even on an idempotent creation replay; busy state can still prevent session reset.  |
| `profile` | Yes | string | Stored Orpheus profile name. minLength: <code>1</code> |
| `template` | Yes | string | Stored Orpheus template name. minLength: <code>1</code> |
| `url` | Yes | string / null | Absolute Space Web card URL from ORPHEUS_PUBLIC_URL, or null when not configured. Computed at response time. format: <code>"uri"</code> |
| `name` | Yes | string |  minLength: <code>1</code><br>maxLength: <code>200</code> |
| `prompt` | Yes | string |  minLength: <code>1</code> |
| `cron` | Yes | string |  minLength: <code>1</code> |
| `timezone` | Yes | string |  minLength: <code>1</code> |
| `status` | Yes | [Status](schema-status.md) |   |
| `model` | Yes | string / null |  minLength: <code>1</code> |
| `session_mode` | Yes | [SessionMode](schema-sessionmode.md) |   |
| `owner_email` | Yes | string / null |  minLength: <code>1</code> |
| `services` | Yes | [ServiceCodes](schema-servicecodes.md) |   |
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
    "can_edit",
    "name",
    "prompt",
    "cron",
    "timezone",
    "status",
    "model",
    "profile",
    "template",
    "session_mode",
    "owner_email",
    "services",
    "created_at",
    "updated_at",
    "next_run_at",
    "deleted_at",
    "last_occurrence"
  ],
  "properties": {
    "can_edit": {
      "type": "boolean",
      "description": "Whether this caller may modify the current schedule. False for deleted schedules. Computed from current ownership even on an idempotent creation replay; busy state can still prevent session reset."
    },
    "profile": {
      "type": "string",
      "minLength": 1,
      "description": "Stored Orpheus profile name."
    },
    "template": {
      "type": "string",
      "minLength": 1,
      "description": "Stored Orpheus template name."
    },
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
    "services": {
      "$ref": "#/components/schemas/ServiceCodes"
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
