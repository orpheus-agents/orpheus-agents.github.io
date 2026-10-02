# Settings



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `base_env_from` | Да | [EnvFrom](schema-envfrom.md) |   |
| `allowed_env_from` | Да | [EnvFrom](schema-envfrom.md) |   |
| `browser_auth` | Да | string |  enum: <code>["api_only","anonymous","saml"]</code> |

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

[Все схемы](schemas.md) · [HTTP API](index.md)
