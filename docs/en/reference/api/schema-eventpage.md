# EventPage



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `has_more` | Yes | boolean |   |
| `items` | Yes | array&lt;[Event](schema-event.md)&gt; |   |
| `next_cursor` | Yes | string |   |

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

[All schemas](schemas.md) · [HTTP API](index.md)
