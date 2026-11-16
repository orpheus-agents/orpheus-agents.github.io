# UpdateTemplate



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `description` | Нет | string / null |  maxLength: <code>4096</code> |
| `active` | Нет | boolean |   |

## JSON Schema

```json
{
  "type": "object",
  "x-go-type": "json.RawMessage",
  "additionalProperties": false,
  "minProperties": 1,
  "properties": {
    "description": {
      "type": [
        "string",
        "null"
      ],
      "maxLength": 4096
    },
    "active": {
      "type": "boolean"
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
