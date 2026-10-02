# Preview



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `times` | Yes | array&lt;string&gt; |  minItems: <code>5</code><br>maxItems: <code>5</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "times"
  ],
  "properties": {
    "times": {
      "type": "array",
      "minItems": 5,
      "maxItems": 5,
      "items": {
        "type": "string",
        "format": "date-time"
      }
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
