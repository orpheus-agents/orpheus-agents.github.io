# CreateSchedule



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `profile` | No | string | Exact Orpheus profile name; creation uses the configured default when omitted. minLength: <code>1</code> |
| `template` | No | string | Exact Orpheus template name; creation uses the configured default when omitted. minLength: <code>1</code> |
| `name` | Yes | string |  minLength: <code>1</code><br>maxLength: <code>200</code> |
| `prompt` | Yes | string |  minLength: <code>1</code> |
| `cron` | Yes | string |  minLength: <code>1</code> |
| `timezone` | Yes | string |  minLength: <code>1</code> |
| `status` | No | [Status](schema-status.md) |   |
| `model` | No | string / null |  minLength: <code>1</code> |
| `session_mode` | No | [SessionMode](schema-sessionmode.md) |   |
| `owner_email` | No | string / null | SAML non-admins must use their session email; omission fills it, explicit null is forbidden. Full-access callers may use any owner or null. minLength: <code>1</code> |
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
    "profile": {
      "type": "string",
      "minLength": 1,
      "description": "Exact Orpheus profile name; creation uses the configured default when omitted."
    },
    "template": {
      "type": "string",
      "minLength": 1,
      "description": "Exact Orpheus template name; creation uses the configured default when omitted."
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
      "minLength": 1,
      "description": "SAML non-admins must use their session email; omission fills it, explicit null is forbidden. Full-access callers may use any owner or null."
    },
    "env_from": {
      "$ref": "#/components/schemas/EnvFrom"
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
