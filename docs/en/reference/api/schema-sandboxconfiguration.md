# SandboxConfiguration



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `env_from` | Yes | array&lt;string&gt; |   |
| `env_names` | Yes | array&lt;string&gt; |   |
| `template` | Yes | string |   |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "env_from": {
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
    "env_from"
  ],
  "title": "SandboxConfiguration",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
