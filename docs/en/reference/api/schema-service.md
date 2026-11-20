# Service



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `code` | Yes | string |   |
| `name` | Yes | string |   |
| `description` | Yes | string |   |
| `env_names` | Yes | array&lt;string&gt; | Sorted destination variable names supplied by this service to the client.  |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "code",
    "name",
    "description",
    "env_names"
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
    "env_names": {
      "description": "Sorted destination variable names supplied by this service to the client.",
      "type": "array",
      "uniqueItems": true,
      "items": {
        "type": "string"
      }
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
