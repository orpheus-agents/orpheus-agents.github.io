# SandboxInput



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `env` | No | object |  additionalProperties: <code>{"type":"string"}</code> |
| `services` | No | [ServiceCodes](schema-servicecodes.md) | Session service codes. The worker resolves them using its current service configuration when preparing the harness or a hook.  |
| `env_from` | No | array&lt;string&gt; |   |
| `template` | Yes | string | Exact active catalog name, including any team slug and tag. Missing or inactive records return 422 unknown_template with detail code template_not_found or template_inactive. Accepted sessions and idempotent replays keep their stored name regardless of subsequent catalog changes. minLength: <code>1</code> |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "env": {
      "additionalProperties": {
        "type": "string"
      },
      "title": "Env",
      "type": "object"
    },
    "services": {
      "description": "Session service codes. The worker resolves them using its current service configuration when preparing the harness or a hook.",
      "$ref": "#/components/schemas/ServiceCodes"
    },
    "env_from": {
      "items": {
        "type": "string"
      },
      "title": "Env From",
      "type": "array"
    },
    "template": {
      "description": "Exact active catalog name, including any team slug and tag. Missing or inactive records return 422 unknown_template with detail code template_not_found or template_inactive. Accepted sessions and idempotent replays keep their stored name regardless of subsequent catalog changes.",
      "minLength": 1,
      "title": "Template",
      "type": "string"
    }
  },
  "required": [
    "template"
  ],
  "title": "SandboxInput",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
