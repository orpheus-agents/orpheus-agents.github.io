# Schedule



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `url` | Да | string / null | Абсолютная ссылка на карточку Space Web из ORPHEUS_PUBLIC_URL. Если адрес не настроен — null. Вычисляется при формировании ответа. format: <code>"uri"</code> |
| `name` | Да | string |  minLength: <code>1</code><br>maxLength: <code>200</code> |
| `prompt` | Да | string |  minLength: <code>1</code> |
| `cron` | Да | string |  minLength: <code>1</code> |
| `timezone` | Да | string |  minLength: <code>1</code> |
| `status` | Да | [Status](schema-status.md) |   |
| `model` | Да | string / null |  minLength: <code>1</code> |
| `session_mode` | Да | [SessionMode](schema-sessionmode.md) |   |
| `owner_email` | Да | string / null |  minLength: <code>1</code> |
| `env_from` | Да | [EnvFrom](schema-envfrom.md) |   |
| `id` | Да | string |  format: <code>"uuid"</code> |
| `created_at` | Да | string |  format: <code>"date-time"</code> |
| `updated_at` | Да | string |  format: <code>"date-time"</code> |
| `next_run_at` | Да | string / null |  format: <code>"date-time"</code> |
| `deleted_at` | Да | string / null |  format: <code>"date-time"</code> |
| `last_occurrence` | Да | [NullableOccurrence](schema-nullableoccurrence.md) |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "id",
    "url",
    "name",
    "prompt",
    "cron",
    "timezone",
    "status",
    "model",
    "session_mode",
    "owner_email",
    "env_from",
    "created_at",
    "updated_at",
    "next_run_at",
    "deleted_at",
    "last_occurrence"
  ],
  "properties": {
    "url": {
      "type": "string",
      "format": "uri",
      "nullable": true,
      "description": "Absolute Space Web card URL from ORPHEUS_PUBLIC_URL, or null when not configured. Computed at response time."
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
    "env_from": {
      "$ref": "#/components/schemas/EnvFrom"
    },
    "id": {
      "type": "string",
      "format": "uuid"
    },
    "created_at": {
      "type": "string",
      "format": "date-time"
    },
    "updated_at": {
      "type": "string",
      "format": "date-time"
    },
    "next_run_at": {
      "type": "string",
      "format": "date-time",
      "nullable": true
    },
    "deleted_at": {
      "type": "string",
      "format": "date-time",
      "nullable": true
    },
    "last_occurrence": {
      "$ref": "#/components/schemas/NullableOccurrence"
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
