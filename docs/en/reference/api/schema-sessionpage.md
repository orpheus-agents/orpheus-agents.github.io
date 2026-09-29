# SessionPage



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `items` | Yes | array&lt;[Session](schema-session.md)&gt; |   |
| `next_cursor` | Yes | string / null |   |

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

[All schemas](schemas.md) · [HTTP API](index.md)
