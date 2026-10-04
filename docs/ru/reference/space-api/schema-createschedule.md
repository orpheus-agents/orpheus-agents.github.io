# CreateSchedule



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `profile` | Нет | string | Точное имя профиля Orpheus. При пропуске создание использует настроенное значение по умолчанию. minLength: <code>1</code> |
| `template` | Нет | string | Точное имя шаблона Orpheus. При пропуске создание использует настроенное значение по умолчанию. minLength: <code>1</code> |
| `name` | Да | string |  minLength: <code>1</code><br>maxLength: <code>200</code> |
| `prompt` | Да | string |  minLength: <code>1</code> |
| `cron` | Да | string |  minLength: <code>1</code> |
| `timezone` | Да | string |  minLength: <code>1</code> |
| `status` | Нет | [Status](schema-status.md) |   |
| `model` | Нет | string / null |  minLength: <code>1</code> |
| `session_mode` | Нет | [SessionMode](schema-sessionmode.md) |   |
| `owner_email` | Нет | string / null | Пользователь SAML без прав администратора использует email своей сессии. Пропуск поля подставляет его, явный null запрещён. При полном доступе допустим любой владелец или null. minLength: <code>1</code> |
| `services` | Нет | [ServiceCodes](schema-servicecodes.md) |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "name",
    "prompt",
    "cron",
    "timezone"
  ],
  "properties": {
    "profile": {
      "type": "string",
      "minLength": 1,
      "description": "Exact Orpheus profile name; creation uses the configured default when omitted."
    },
    "template": {
      "type": "string",
      "minLength": 1,
      "description": "Exact Orpheus template name; creation uses the configured default when omitted."
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
    },
    "prompt": {
      "type": "string",
      "minLength": 1
    },
    "cron": {
      "type": "string",
      "minLength": 1
    },
    "timezone": {
      "type": "string",
      "minLength": 1
    },
    "status": {
      "$ref": "#/components/schemas/Status"
    },
    "model": {
      "type": "string",
      "nullable": true,
      "minLength": 1
    },
    "session_mode": {
      "$ref": "#/components/schemas/SessionMode"
    },
    "owner_email": {
      "type": "string",
      "nullable": true,
      "minLength": 1,
      "description": "SAML non-admins must use their session email; omission fills it, explicit null is forbidden. Full-access callers may use any owner or null."
    },
    "services": {
      "$ref": "#/components/schemas/ServiceCodes"
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
