# MessageEvent



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `created_at` | Yes | string |  format: <code>"date-time"</code> |
| `data` | Yes | [Message](schema-message.md) |   |
| `id` | Yes | string |   |
| `session_id` | Yes | string |  format: <code>"uuid"</code> |
| `type` | Yes | string |  enum: <code>["message.updated"]</code> |

## JSON Schema

```json
{
  "properties": {
    "created_at": {
      "format": "date-time",
      "title": "Created At",
      "type": "string"
    },
    "data": {
      "$ref": "#/components/schemas/Message"
    },
    "id": {
      "title": "Id",
      "type": "string"
    },
    "session_id": {
      "format": "uuid",
      "title": "Session Id",
      "type": "string"
    },
    "type": {
      "enum": [
        "message.updated"
      ],
      "type": "string"
    }
  },
  "required": [
    "id",
    "session_id",
    "type",
    "created_at",
    "data"
  ],
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
