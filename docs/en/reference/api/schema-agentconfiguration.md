# AgentConfiguration



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `instructions` | Yes | string |   |
| `model` | Yes | string |   |
| `profile` | Yes | string |   |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "instructions": {
      "title": "Instructions",
      "type": "string"
    },
    "model": {
      "title": "Model",
      "type": "string"
    },
    "profile": {
      "title": "Profile",
      "type": "string"
    }
  },
  "required": [
    "profile",
    "model",
    "instructions"
  ],
  "title": "AgentConfiguration",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
