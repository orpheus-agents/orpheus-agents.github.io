# Profiles



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `next_cursor` | Yes | string / null |   |
| `prev_cursor` | Yes | string / null |   |
| `items` | Yes | array&lt;[Profile](schema-profile.md)&gt; |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "items",
    "next_cursor",
    "prev_cursor"
  ],
  "properties": {
    "next_cursor": {
      "type": "string",
      "nullable": true
    },
    "prev_cursor": {
      "type": "string",
      "nullable": true
    },
    "items": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/Profile"
      }
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
