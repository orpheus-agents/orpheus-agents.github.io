# Cancelled



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `run_id` | Да | string |  format: <code>"uuid"</code> |
| `status` | Да | [RunStatus](schema-runstatus.md) |   |

## JSON Schema

```json
{
  "properties": {
    "run_id": {
      "format": "uuid",
      "title": "Run Id",
      "type": "string"
    },
    "status": {
      "$ref": "#/components/schemas/RunStatus"
    }
  },
  "required": [
    "run_id",
    "status"
  ],
  "title": "Cancelled",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
