# Accepted



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `message_id` | Да | string | ID последнего принятого сообщения в упорядоченном пакете. format: <code>"uuid"</code> |
| `run_id` | Да | string |  format: <code>"uuid"</code> |
| `session_id` | Да | string |  format: <code>"uuid"</code> |

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

[Все схемы](schemas.md) · [HTTP API](index.md)
