# AccountLimits



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `as_of` | Yes | string |  format: <code>"date-time"</code> |
| `stale_after_seconds` | Yes | integer |  minimum: <code>1</code> |
| `items` | Yes | array&lt;[AccountLimitItem](schema-accountlimititem.md)&gt; |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "as_of",
    "stale_after_seconds",
    "items"
  ],
  "properties": {
    "as_of": {
      "type": "string",
      "format": "date-time"
    },
    "stale_after_seconds": {
      "type": "integer",
      "minimum": 1
    },
    "items": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/AccountLimitItem"
      }
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
