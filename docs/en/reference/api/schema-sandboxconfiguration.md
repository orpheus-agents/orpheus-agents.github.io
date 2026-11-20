# SandboxConfiguration



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `services` | Yes | [ServiceCodes](schema-servicecodes.md) |   |
| `env_from` | Yes | array&lt;string&gt; | Sorted worker variable names explicitly requested for the session.  |
| `env_names` | Yes | array&lt;string&gt; | Sorted names of explicit session env values.  |
| `template` | Yes | string |   |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "services": {
      "$ref": "#/components/schemas/ServiceCodes"
    },
    "env_from": {
      "description": "Sorted worker variable names explicitly requested for the session.",
      "items": {
        "type": "string"
      },
      "title": "Env From",
      "type": "array"
    },
    "env_names": {
      "description": "Sorted names of explicit session env values.",
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
