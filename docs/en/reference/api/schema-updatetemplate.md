# UpdateTemplate



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `description` | No | string / null |  maxLength: <code>4096</code> |
| `active` | No | boolean |   |

## JSON Schema

```json
{
  "type": "object",
  "x-go-type": "json.RawMessage",
  "additionalProperties": false,
  "minProperties": 1,
  "properties": {
    "description": {
      "type": [
        "string",
        "null"
      ],
      "maxLength": 4096
    },
    "active": {
      "type": "boolean"
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
