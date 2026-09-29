# ErrorResponse



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `error` | Да | [Error](schema-error.md) |   |

## JSON Schema

```json
{
  "properties": {
    "error": {
      "$ref": "#/components/schemas/Error"
    }
  },
  "required": [
    "error"
  ],
  "title": "ErrorResponse",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
