# Message



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `external_key` | Yes | string / null | External key supplied for an incoming message; null for agent messages. Opaque identifier, 1–512 UTF-8 bytes; no NUL or whitespace-only value. Compared exactly, without normalization.  |
| `metadata` | Yes | object / null | Opaque integration data for an incoming message; never sent to the agent. Null for messages without metadata and agent messages.  |
| `created_at` | Yes | string |  format: <code>"date-time"</code> |
| `delivery_status` | Yes | string / null |   |
| `error` | Yes | [Error](schema-error.md) / null |   |
| `id` | Yes | string |  format: <code>"uuid"</code> |
| `kind` | Yes | string / null |   |
| `position` | Yes | [Position](schema-position.md) / null |   |
| `registered_sequence` | Yes | string |   |
| `role` | Yes | string |  enum: <code>["user","assistant"]</code> |
| `run_id` | Yes | string |  format: <code>"uuid"</code> |
| `session_id` | Yes | string |  format: <code>"uuid"</code> |
| `text` | Yes | string |   |

## JSON Schema

```json
{
  "properties": {
    "external_key": {
      "description": "External key supplied for an incoming message; null for agent messages. Opaque identifier, 1–512 UTF-8 bytes; no NUL or whitespace-only value. Compared exactly, without normalization.",
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "null"
        }
      ]
    },
    "metadata": {
      "description": "Opaque integration data for an incoming message; never sent to the agent. Null for messages without metadata and agent messages.",
      "x-go-type": "json.RawMessage",
      "anyOf": [
        {
          "type": "object",
          "additionalProperties": true
        },
        {
          "type": "null"
        }
      ]
    },
    "created_at": {
      "format": "date-time",
      "title": "Created At",
      "type": "string"
    },
    "delivery_status": {
      "anyOf": [
        {
          "enum": [
            "pending",
            "sending",
            "delivered",
            "uncertain",
            "rejected"
          ],
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
      "title": "Delivery Status"
    },
    "error": {
      "anyOf": [
        {
          "$ref": "#/components/schemas/Error"
        },
        {
          "type": "null"
        }
      ]
    },
    "id": {
      "format": "uuid",
      "title": "Id",
      "type": "string"
    },
    "kind": {
      "anyOf": [
        {
          "enum": [
            "progress",
            "answer"
          ],
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
      "title": "Kind"
    },
    "position": {
      "anyOf": [
        {
          "$ref": "#/components/schemas/Position"
        },
        {
          "type": "null"
        }
      ]
    },
    "registered_sequence": {
      "title": "Registered Sequence",
      "type": "string"
    },
    "role": {
      "enum": [
        "user",
        "assistant"
      ],
      "title": "Role",
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
    },
    "text": {
      "title": "Text",
      "type": "string"
    }
  },
  "required": [
    "external_key",
    "metadata",
    "id",
    "session_id",
    "run_id",
    "role",
    "kind",
    "text",
    "delivery_status",
    "error",
    "registered_sequence",
    "position",
    "created_at"
  ],
  "title": "Message",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
