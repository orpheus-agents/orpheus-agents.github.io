# SendMessage



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `messages` | Yes | array&lt;[TextMessage](schema-textmessage.md)&gt; | Ordered user messages accepted atomically for the active run. minItems: <code>1</code><br>maxItems: <code>256</code> |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "messages": {
      "description": "Ordered user messages accepted atomically for the active run.",
      "type": "array",
      "minItems": 1,
      "maxItems": 256,
      "items": {
        "$ref": "#/components/schemas/TextMessage"
      }
    }
  },
  "required": [
    "messages"
  ],
  "title": "SendMessage",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
