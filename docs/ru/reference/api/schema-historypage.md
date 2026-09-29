# HistoryPage



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `event_cursor` | Да | string |   |
| `items` | Да | array&lt;[MessageItem](schema-messageitem.md) / [ToolItem](schema-toolitem.md)&gt; |   |
| `next_cursor` | Да | string / null |   |

## JSON Schema

```json
{
  "properties": {
    "event_cursor": {
      "title": "Event Cursor",
      "type": "string"
    },
    "items": {
      "items": {
        "discriminator": {
          "mapping": {
            "message": "#/components/schemas/MessageItem",
            "tool_call": "#/components/schemas/ToolItem"
          },
          "propertyName": "type"
        },
        "oneOf": [
          {
            "$ref": "#/components/schemas/MessageItem"
          },
          {
            "$ref": "#/components/schemas/ToolItem"
          }
        ]
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
    "next_cursor",
    "event_cursor"
  ],
  "title": "HistoryPage",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
