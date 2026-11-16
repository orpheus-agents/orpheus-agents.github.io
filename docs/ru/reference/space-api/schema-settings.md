# Settings



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `default_template` | Да | string | Настроенный шаблон по умолчанию для создания. Проверяйте его через GET /api/v1/templates?name=... без фильтра active. Запись может отсутствовать или быть неактивной.  |
| `browser_auth` | Да | string |  enum: <code>["api_only","anonymous","saml"]</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "browser_auth",
    "default_template"
  ],
  "properties": {
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

[Все схемы](schemas.md) · [HTTP API](index.md)
