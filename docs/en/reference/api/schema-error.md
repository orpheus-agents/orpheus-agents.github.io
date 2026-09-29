# Error



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `code` | Yes | string |   |
| `details` | Yes | array&lt;[ErrorDetail](schema-errordetail.md)&gt; |   |
| `message` | Yes | string |   |
| `phase` | Yes | string / null |   |

## JSON Schema

```json
{
  "properties": {
    "code": {
      "title": "Code",
      "type": "string"
    },
    "details": {
      "items": {
        "$ref": "#/components/schemas/ErrorDetail"
      },
      "title": "Details",
      "type": "array"
    },
    "message": {
      "title": "Message",
      "type": "string"
    },
    "phase": {
      "anyOf": [
        {
          "enum": [
            "preparation",
            "execution",
            "finalization",
            "recovery"
          ],
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
      "title": "Phase"
    }
  },
  "required": [
    "code",
    "message",
    "phase",
    "details"
  ],
  "title": "Error",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
