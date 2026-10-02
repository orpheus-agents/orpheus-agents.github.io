# SchedulePage



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `items` | Yes | array&lt;[Schedule](schema-schedule.md)&gt; |   |
| `next_cursor` | Yes | string / null |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "items",
    "next_cursor"
  ],
  "properties": {
    "items": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/Schedule"
      }
    },
    "next_cursor": {
      "type": "string",
      "nullable": true
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
