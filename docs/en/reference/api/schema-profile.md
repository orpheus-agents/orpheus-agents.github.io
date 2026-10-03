# Profile



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `name` | Yes | string |   |
| `description` | Yes | string / null |   |
| `harness` | Yes | string |  enum: <code>["codex"]</code> |
| `model` | Yes | string / null |   |
| `codex` | Yes | [CodexProfile](schema-codexprofile.md) |   |
| `instructions` | Yes | string |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "name",
    "description",
    "harness",
    "model",
    "codex",
    "instructions"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "description": {
      "type": [
        "string",
        "null"
      ]
    },
    "harness": {
      "type": "string",
      "enum": [
        "codex"
      ]
    },
    "model": {
      "type": [
        "string",
        "null"
      ]
    },
    "codex": {
      "$ref": "#/components/schemas/CodexProfile"
    },
    "instructions": {
      "type": "string"
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
