# UpdateSchedule



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `profile` | No | string | Exact Orpheus profile name; omitted keeps the stored choice; a change starts a new reusable session. minLength: <code>1</code> |
| `template` | No | string | Exact Orpheus template name; omitted keeps the stored choice; a change starts a new reusable session. minLength: <code>1</code> |
| `name` | No | string |  minLength: <code>1</code><br>maxLength: <code>200</code> |
| `prompt` | No | string |  minLength: <code>1</code> |
| `cron` | No | string |  minLength: <code>1</code> |
| `timezone` | No | string |  minLength: <code>1</code> |
| `status` | No | [Status](schema-status.md) |   |
| `model` | No | string / null |  minLength: <code>1</code> |
| `session_mode` | No | [SessionMode](schema-sessionmode.md) |   |
| `owner_email` | No | string / null |  minLength: <code>1</code> |
| `services` | No | [ServiceCodes](schema-servicecodes.md) |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "profile": {
      "type": "string",
      "minLength": 1,
      "description": "Exact Orpheus profile name; omitted keeps the stored choice; a change starts a new reusable session."
    },
    "template": {
      "type": "string",
      "minLength": 1,
      "description": "Exact Orpheus template name; omitted keeps the stored choice; a change starts a new reusable session."
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
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
