# CreateSchedule



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `name` | Yes | string |  minLength: <code>1</code><br>maxLength: <code>200</code> |
| `prompt` | Yes | string |  minLength: <code>1</code> |
| `cron` | Yes | string |  minLength: <code>1</code> |
| `timezone` | Yes | string |  minLength: <code>1</code> |
| `status` | No | [Status](schema-status.md) |   |
| `model` | No | string / null |  minLength: <code>1</code> |
| `session_mode` | No | [SessionMode](schema-sessionmode.md) |   |
| `owner_email` | No | string / null |  minLength: <code>1</code> |
| `env_from` | No | [EnvFrom](schema-envfrom.md) |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "name",
    "prompt",
    "cron",
    "timezone"
  ],
  "properties": {
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
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
