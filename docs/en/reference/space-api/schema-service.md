# Service



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `code` | Yes | string |  pattern: <code>"^[a-z][a-z0-9_-]{0,63}$"</code> |
| `name` | Yes | string |   |
| `description` | Yes | string |   |
| `env_from` | Yes | array&lt;string&gt; | Names of worker environment variables included in this service; never values.  |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "code",
    "name",
    "description",
    "env_from"
  ],
  "properties": {
    "code": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9_-]{0,63}$"
    },
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "env_from": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Names of worker environment variables included in this service; never values."
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
