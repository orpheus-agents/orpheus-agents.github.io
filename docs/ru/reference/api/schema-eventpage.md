# EventPage



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `has_more` | Да | boolean |   |
| `items` | Да | array&lt;[Event](schema-event.md)&gt; |   |
| `next_cursor` | Да | string |   |

## JSON Schema

```json
{
  "properties": {
    "has_more": {
      "title": "Has More",
      "type": "boolean"
    },
    "items": {
      "items": {
        "$ref": "#/components/schemas/Event"
      },
      "title": "Items",
      "type": "array"
    },
    "next_cursor": {
      "title": "Next Cursor",
      "type": "string"
    }
  },
  "required": [
    "items",
    "next_cursor",
    "has_more"
  ],
  "title": "EventPage",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
