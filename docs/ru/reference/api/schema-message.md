# Message



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `external_key` | Да | string / null | Внешний ключ входного сообщения. null для сообщений агента. От 1 до 512 байт UTF-8. NUL и строки только из пробелов запрещены. Точное сравнение.  |
| `metadata` | Да | object / null | Служебные данные интеграции для входного сообщения. Не передаются агенту. null для сообщений без metadata и сообщений агента.  |
| `created_at` | Да | string |  format: <code>"date-time"</code> |
| `delivery_status` | Да | string / null |   |
| `error` | Да | [Error](schema-error.md) / null |   |
| `id` | Да | string |  format: <code>"uuid"</code> |
| `kind` | Да | string / null |   |
| `position` | Да | [Position](schema-position.md) / null |   |
| `registered_sequence` | Да | string |   |
| `role` | Да | string |  enum: <code>["user","assistant"]</code> |
| `run_id` | Да | string |  format: <code>"uuid"</code> |
| `session_id` | Да | string |  format: <code>"uuid"</code> |
| `text` | Да | string |   |

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

[Все схемы](schemas.md) · [HTTP API](index.md)
