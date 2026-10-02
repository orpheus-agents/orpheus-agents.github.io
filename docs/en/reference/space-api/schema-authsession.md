# AuthSession



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `mode` | Yes | string |  enum: <code>["api_only","anonymous","saml"]</code> |
| `authenticated` | Yes | boolean |   |
| `read_access` | Yes | boolean |   |
| `write_access` | Yes | boolean |   |
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
    "write_access",
    "user",
    "expires_at"
  ],
  "properties": {
    "mode": {
      "type": "string",
      "enum": [
        "api_only",
        "anonymous",
        "saml"
      ]
    },
    "authenticated": {
      "type": "boolean"
    },
    "read_access": {
      "type": "boolean"
    },
    "write_access": {
      "type": "boolean"
    },
    "user": {
      "type": "object",
      "nullable": true,
      "additionalProperties": false,
      "required": [
        "subject",
        "display_name",
        "email"
      ],
      "properties": {
        "subject": {
          "type": "string"
        },
        "display_name": {
          "type": "string"
        },
        "email": {
          "type": "string",
          "nullable": true,
          "description": "Normalized email from the SAML identity, or null when unavailable."
        }
      }
    },
    "expires_at": {
      "type": "string",
      "format": "date-time",
      "nullable": true
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
