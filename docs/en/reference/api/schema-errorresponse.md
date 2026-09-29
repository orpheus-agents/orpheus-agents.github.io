# ErrorResponse



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `error` | Yes | [Error](schema-error.md) |   |

## JSON Schema

```json
{
  "properties": {
    "error": {
      "$ref": "#/components/schemas/Error"
    }
  },
  "required": [
    "error"
  ],
  "title": "ErrorResponse",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
