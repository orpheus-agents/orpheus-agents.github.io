# UpdateSchedule



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `profile` | Нет | string | Точное имя профиля Orpheus. Пропуск сохраняет текущий выбор. Смена начинает новую сессию при повторном использовании контекста. minLength: <code>1</code> |
| `template` | Нет | string | Точное имя шаблона Orpheus. Пропуск сохраняет текущий выбор. Смена начинает новую сессию при повторном использовании контекста. minLength: <code>1</code> |
| `name` | Нет | string |  minLength: <code>1</code><br>maxLength: <code>200</code> |
| `prompt` | Нет | string |  minLength: <code>1</code> |
| `cron` | Нет | string |  minLength: <code>1</code> |
| `timezone` | Нет | string |  minLength: <code>1</code> |
| `status` | Нет | [Status](schema-status.md) |   |
| `model` | Нет | string / null |  minLength: <code>1</code> |
| `session_mode` | Нет | [SessionMode](schema-sessionmode.md) |   |
| `owner_email` | Нет | string / null |  minLength: <code>1</code> |
| `services` | Нет | [ServiceCodes](schema-servicecodes.md) |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "profile": {
      "type": "string",
      "minLength": 1,
      "description": "Exact Orpheus profile name; omitted keeps the stored choice; a change starts a new reusable session."
    },
    "template": {
      "type": "string",
      "minLength": 1,
      "description": "Exact Orpheus template name; omitted keeps the stored choice; a change starts a new reusable session."
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
      "minLength": 1
    },
    "services": {
      "$ref": "#/components/schemas/ServiceCodes"
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
