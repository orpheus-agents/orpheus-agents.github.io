# AuthSession



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `mode` | Да | string |  enum: <code>["api_only","anonymous","saml"]</code> |
| `authenticated` | Да | boolean |   |
| `read_access` | Да | boolean |   |
| `write_access` | Да | boolean | Можно создавать задания и менять доступные вызывающему задания. Пользователи SAML без email не могут писать.  |
| `can_manage_all` | Да | boolean | Можно управлять всеми заданиями, назначать и очищать владельцев. True для настроенных администраторов SAML, действительных Bearer-ключей и режима anonymous.  |
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
    "write_access",
    "can_manage_all",
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
      "type": "boolean",
      "description": "Can create schedules and modify those available to this caller. SAML users without an email cannot write."
    },
    "can_manage_all": {
      "type": "boolean",
      "description": "Can manage all schedules and assign or clear their owners. True for configured SAML admins, valid Bearer keys and anonymous mode."
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

[Все схемы](schemas.md) · [HTTP API](index.md)
