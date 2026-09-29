# RunEvent



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `created_at` | Да | string |  format: <code>"date-time"</code> |
| `data` | Да | [Run](schema-run.md) |   |
| `id` | Да | string |   |
| `session_id` | Да | string |  format: <code>"uuid"</code> |
| `type` | Да | string |  enum: <code>["run.updated"]</code> |

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
      "$ref": "#/components/schemas/Run"
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
        "run.updated"
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
