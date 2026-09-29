# RunPage



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `items` | Yes | array&lt;[Run](schema-run.md)&gt; |   |
| `next_cursor` | Yes | string / null |   |

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

[All schemas](schemas.md) · [HTTP API](index.md)
