# SandboxInput



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `env` | No | object |  additionalProperties: <code>{"type":"string"}</code> |
| `services` | No | [ServiceCodes](schema-servicecodes.md) | Services available to the agent and session hooks, expanded together with env_from.  |
| `env_from` | No | array&lt;string&gt; |   |
| `template` | Yes | string |  minLength: <code>1</code> |

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
      "description": "Services available to the agent and session hooks, expanded together with env_from.",
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
