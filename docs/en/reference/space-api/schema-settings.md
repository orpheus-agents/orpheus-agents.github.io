# Settings



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `default_profile` | Yes | string | Configured creation default, independent of catalog filters and pagination. Resolve the exact name before automatically selecting it.  |
| `default_template` | Yes | string | Configured creation default. Resolve it with GET /api/v1/templates?name=... without an active filter; it may be absent or inactive.  |
| `browser_auth` | Yes | string |  enum: <code>["api_only","anonymous","saml"]</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "browser_auth",
    "default_template",
    "default_profile"
  ],
  "properties": {
    "default_profile": {
      "type": "string",
      "description": "Configured creation default, independent of catalog filters and pagination. Resolve the exact name before automatically selecting it."
    },
    "default_template": {
      "type": "string",
      "description": "Configured creation default. Resolve it with GET /api/v1/templates?name=... without an active filter; it may be absent or inactive."
    },
    "browser_auth": {
      "type": "string",
      "enum": [
        "api_only",
        "anonymous",
        "saml"
      ]
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
