# Error



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `code` | Yes | string |   |
| `diagnostic_id` | No | string / null | Identifier of the internal diagnostic log for this error, when available. It does not grant access to logs.  |
| `details` | Yes | array&lt;[ErrorDetail](schema-errordetail.md)&gt; |   |
| `message` | Yes | string | Human-readable error message. Harness execution failures include the original harness message and additional details when available; otherwise a generic message is returned.  |
| `phase` | Yes | string / null |   |

## JSON Schema

```json
{
  "properties": {
    "code": {
      "title": "Code",
      "type": "string"
    },
    "diagnostic_id": {
      "description": "Identifier of the internal diagnostic log for this error, when available. It does not grant access to logs.",
      "anyOf": [
        {
          "type": "string",
          "format": "uuid"
        },
        {
          "type": "null"
        }
      ]
    },
    "details": {
      "items": {
        "$ref": "#/components/schemas/ErrorDetail"
      },
      "title": "Details",
      "type": "array"
    },
    "message": {
      "description": "Human-readable error message. Harness execution failures include the original harness message and additional details when available; otherwise a generic message is returned.",
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
