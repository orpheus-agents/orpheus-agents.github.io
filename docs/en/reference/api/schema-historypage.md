# HistoryPage



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `event_cursor` | Yes | string |   |
| `items` | Yes | array&lt;[MessageItem](schema-messageitem.md) / [ToolItem](schema-toolitem.md)&gt; |   |
| `next_cursor` | Yes | string / null |   |

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

[All schemas](schemas.md) · [HTTP API](index.md)
