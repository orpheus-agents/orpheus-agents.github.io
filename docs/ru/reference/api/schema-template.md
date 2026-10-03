# Template



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `name` | Да | string |   |
| `description` | Да | string / null |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "name",
    "description"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "description": {
      "type": [
        "string",
        "null"
      ]
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
