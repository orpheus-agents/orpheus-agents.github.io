# AgentConfiguration



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `opencode` | No | [OpenCodeProfile](schema-opencodeprofile.md) |   |
| `instructions` | Yes | string |   |
| `model` | Yes | string |   |
| `profile` | Yes | string |   |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "opencode": {
      "$ref": "#/components/schemas/OpenCodeProfile"
    },
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
