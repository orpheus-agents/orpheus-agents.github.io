# ReplaceAPIKey



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `api_key` | Yes | string |  minLength: <code>1</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "api_key"
  ],
  "properties": {
    "api_key": {
      "type": "string",
      "minLength": 1,
      "writeOnly": true
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
