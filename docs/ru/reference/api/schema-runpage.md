# RunPage



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `items` | Да | array&lt;[Run](schema-run.md)&gt; |   |
| `next_cursor` | Да | string / null |   |

## JSON Schema

```json
{
  "properties": {
    "items": {
      "items": {
        "$ref": "#/components/schemas/Run"
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
  "title": "RunPage",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
