# Service



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `code` | Yes | string |   |
| `name` | Yes | string |   |
| `description` | Yes | string |   |
| `env_from` | Yes | array&lt;string&gt; | Sorted environment variable names; never their values.  |

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
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "env_from": {
      "description": "Sorted environment variable names; never their values.",
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
