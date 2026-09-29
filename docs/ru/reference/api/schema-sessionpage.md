# SessionPage



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `items` | Да | array&lt;[Session](schema-session.md)&gt; |   |
| `next_cursor` | Да | string / null |   |

## JSON Schema

```json
{
  "properties": {
    "items": {
      "items": {
        "$ref": "#/components/schemas/Session"
      },
      "title": "Items",
      "type": "array"
    },
    "next_cursor": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
      "title": "Next Cursor"
    }
  },
  "required": [
    "items",
    "next_cursor"
  ],
  "title": "SessionPage",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
