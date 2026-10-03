# Template



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `name` | Да | string |   |
| `description` | Да | string / null |   |
| `is_default` | Да | boolean |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "name",
    "description",
    "is_default"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string",
      "nullable": true
    },
    "is_default": {
      "type": "boolean"
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
