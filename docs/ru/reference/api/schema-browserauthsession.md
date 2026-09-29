# BrowserAuthSession



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `mode` | Да | string |  enum: <code>["api_only","saml","anonymous"]</code> |
| `authenticated` | Да | boolean |   |
| `read_access` | Да | boolean |   |
| `user` | Да | object / null |  additionalProperties: <code>false</code> |
| `expires_at` | Да | string / null |  format: <code>"date-time"</code> |

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

[Все схемы](schemas.md) · [HTTP API](index.md)
