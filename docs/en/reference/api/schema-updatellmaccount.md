# UpdateLLMAccount



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `name` | No | string |  minLength: <code>1</code><br>maxLength: <code>255</code> |
| `active` | No | boolean |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [],
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "active": {
      "type": "boolean"
    }
  },
  "x-go-type": "json.RawMessage",
  "minProperties": 1
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
