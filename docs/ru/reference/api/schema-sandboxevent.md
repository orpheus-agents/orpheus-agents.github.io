# SandboxEvent



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `created_at` | Да | string |  format: <code>"date-time"</code> |
| `data` | Да | [SandboxState](schema-sandboxstate.md) |   |
| `id` | Да | string |   |
| `session_id` | Да | string |  format: <code>"uuid"</code> |
| `type` | Да | string |  enum: <code>["sandbox.updated"]</code> |

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
      "$ref": "#/components/schemas/SandboxState"
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
        "sandbox.updated"
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
