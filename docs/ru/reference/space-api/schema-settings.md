# Settings



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `browser_auth` | Да | string |  enum: <code>["api_only","anonymous","saml"]</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "browser_auth"
  ],
  "properties": {
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
