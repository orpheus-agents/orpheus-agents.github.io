# UpdateSchedule



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `name` | Нет | string |  minLength: <code>1</code><br>maxLength: <code>200</code> |
| `prompt` | Нет | string |  minLength: <code>1</code> |
| `cron` | Нет | string |  minLength: <code>1</code> |
| `timezone` | Нет | string |  minLength: <code>1</code> |
| `status` | Нет | [Status](schema-status.md) |   |
| `model` | Нет | string / null |  minLength: <code>1</code> |
| `session_mode` | Нет | [SessionMode](schema-sessionmode.md) |   |
| `owner_email` | Нет | string / null |  minLength: <code>1</code> |
| `env_from` | Нет | [EnvFrom](schema-envfrom.md) |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
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
    "env_from": {
      "$ref": "#/components/schemas/EnvFrom"
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
