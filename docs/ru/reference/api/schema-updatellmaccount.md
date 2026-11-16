# UpdateLLMAccount



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `name` | Нет | string |  minLength: <code>1</code><br>maxLength: <code>255</code> |
| `active` | Нет | boolean |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [],
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "active": {
      "type": "boolean"
    }
  },
  "x-go-type": "json.RawMessage",
  "minProperties": 1
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
