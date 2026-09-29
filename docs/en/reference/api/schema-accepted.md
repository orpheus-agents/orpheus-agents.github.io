# Accepted



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `message_id` | Yes | string | ID of the last accepted message in the ordered batch. format: <code>"uuid"</code> |
| `run_id` | Yes | string |  format: <code>"uuid"</code> |
| `session_id` | Yes | string |  format: <code>"uuid"</code> |

## JSON Schema

```json
{
  "properties": {
    "message_id": {
      "description": "ID of the last accepted message in the ordered batch.",
      "format": "uuid",
      "title": "Message Id",
      "type": "string"
    },
    "run_id": {
      "format": "uuid",
      "title": "Run Id",
      "type": "string"
    },
    "session_id": {
      "format": "uuid",
      "title": "Session Id",
      "type": "string"
    }
  },
  "required": [
    "session_id",
    "run_id",
    "message_id"
  ],
  "title": "Accepted",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
