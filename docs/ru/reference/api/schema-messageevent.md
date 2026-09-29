# MessageEvent



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `created_at` | Да | string |  format: <code>"date-time"</code> |
| `data` | Да | [Message](schema-message.md) |   |
| `id` | Да | string |   |
| `session_id` | Да | string |  format: <code>"uuid"</code> |
| `type` | Да | string |  enum: <code>["message.updated"]</code> |

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

[Все схемы](schemas.md) · [HTTP API](index.md)
