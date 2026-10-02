# Settings



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `base_env_from` | Yes | [EnvFrom](schema-envfrom.md) |   |
| `allowed_env_from` | Yes | [EnvFrom](schema-envfrom.md) |   |
| `browser_auth` | Yes | string |  enum: <code>["api_only","anonymous","saml"]</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "base_env_from",
    "allowed_env_from",
    "browser_auth"
  ],
  "properties": {
    "base_env_from": {
      "$ref": "#/components/schemas/EnvFrom"
    },
    "allowed_env_from": {
      "$ref": "#/components/schemas/EnvFrom"
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
