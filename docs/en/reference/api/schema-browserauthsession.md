# BrowserAuthSession



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `mode` | Yes | string |  enum: <code>["api_only","saml","anonymous"]</code> |
| `authenticated` | Yes | boolean |   |
| `read_access` | Yes | boolean |   |
| `user` | Yes | object / null |  additionalProperties: <code>false</code> |
| `expires_at` | Yes | string / null |  format: <code>"date-time"</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "mode",
    "authenticated",
    "read_access",
    "user",
    "expires_at"
  ],
  "properties": {
    "mode": {
      "type": "string",
      "enum": [
        "api_only",
        "saml",
        "anonymous"
      ]
    },
    "authenticated": {
      "type": "boolean"
    },
    "read_access": {
      "type": "boolean"
    },
    "user": {
      "type": [
        "object",
        "null"
      ],
      "additionalProperties": false,
      "required": [
        "display_name"
      ],
      "properties": {
        "display_name": {
          "type": "string"
        }
      }
    },
    "expires_at": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time"
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
