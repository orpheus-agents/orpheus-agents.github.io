# SandboxConfiguration



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `services` | Yes | array&lt;[Service](schema-service.md)&gt; | Immutable service descriptions and environment names resolved when accepted.  |
| `env_from` | Yes | array&lt;string&gt; | Sorted orchestrator environment variable names, including expanded services.  |
| `env_names` | Yes | array&lt;string&gt; |   |
| `template` | Yes | string |   |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "services": {
      "description": "Immutable service descriptions and environment names resolved when accepted.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/Service"
      }
    },
    "env_from": {
      "description": "Sorted orchestrator environment variable names, including expanded services.",
      "items": {
        "type": "string"
      },
      "title": "Env From",
      "type": "array"
    },
    "env_names": {
      "items": {
        "type": "string"
      },
      "title": "Env Names",
      "type": "array"
    },
    "template": {
      "title": "Template",
      "type": "string"
    }
  },
  "required": [
    "template",
    "env_names",
    "env_from",
    "services"
  ],
  "title": "SandboxConfiguration",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
