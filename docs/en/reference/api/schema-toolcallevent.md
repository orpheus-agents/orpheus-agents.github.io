# ToolCallEvent



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `created_at` | Yes | string |  format: <code>"date-time"</code> |
| `data` | Yes | [ToolCall](schema-toolcall.md) |   |
| `id` | Yes | string |   |
| `session_id` | Yes | string |  format: <code>"uuid"</code> |
| `type` | Yes | string |  enum: <code>["tool_call.updated"]</code> |

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
      "$ref": "#/components/schemas/ToolCall"
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
        "tool_call.updated"
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
