# LLMAccounts



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `items` | Yes | array&lt;[LLMAccount](schema-llmaccount.md)&gt; |   |
| `next_cursor` | Yes | string / null |   |
| `prev_cursor` | Yes | string / null |   |

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
    "items": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/LLMAccount"
      }
    },
    "next_cursor": {
      "type": [
        "string",
        "null"
      ]
    },
    "prev_cursor": {
      "type": [
        "string",
        "null"
      ]
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
