# AgentInput



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `instructions` | No | string |  default: <code>""</code> |
| `model` | No | string |  minLength: <code>1</code> |
| `profile` | Yes | string |  minLength: <code>1</code> |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "instructions": {
      "default": "",
      "title": "Instructions",
      "type": "string"
    },
    "model": {
      "minLength": 1,
      "title": "Model",
      "type": "string"
    },
    "profile": {
      "minLength": 1,
      "title": "Profile",
      "type": "string"
    }
  },
  "required": [
    "profile"
  ],
  "title": "AgentInput",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
