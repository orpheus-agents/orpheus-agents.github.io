# TextMessage



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `external_key` | No | string | External message or event key; not unique and not sent to the harness. Opaque identifier, 1–512 UTF-8 bytes; no NUL or whitespace-only value. Compared exactly, without normalization. minLength: <code>1</code><br>maxLength: <code>512</code> |
| `text` | Yes | string |  minLength: <code>1</code> |
| `metadata` | No | object | Opaque integration data retained with the message, never sent to the agent. If present, must be a JSON object. additionalProperties: <code>true</code> |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "external_key": {
      "description": "External message or event key; not unique and not sent to the harness. Opaque identifier, 1–512 UTF-8 bytes; no NUL or whitespace-only value. Compared exactly, without normalization.",
      "type": "string",
      "minLength": 1,
      "maxLength": 512
    },
    "text": {
      "minLength": 1,
      "title": "Text",
      "type": "string"
    },
    "metadata": {
      "description": "Opaque integration data retained with the message, never sent to the agent. If present, must be a JSON object.",
      "type": "object",
      "additionalProperties": true,
      "x-go-type": "json.RawMessage"
    }
  },
  "required": [
    "text"
  ],
  "title": "TextMessage",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
