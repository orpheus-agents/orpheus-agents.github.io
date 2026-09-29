# MessageItem



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `message` | Yes | [Message](schema-message.md) |   |
| `type` | Yes | string |  const: <code>"message"</code><br>default: <code>"message"</code> |

## JSON Schema

```json
{
  "properties": {
    "message": {
      "$ref": "#/components/schemas/Message"
    },
    "type": {
      "const": "message",
      "default": "message",
      "title": "Type",
      "type": "string"
    }
  },
  "required": [
    "message",
    "type"
  ],
  "title": "MessageItem",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
