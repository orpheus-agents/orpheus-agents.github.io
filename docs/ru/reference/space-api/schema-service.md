# Service



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `code` | Да | string |  pattern: <code>"^[a-z][a-z0-9_-]{0,63}$"</code> |
| `name` | Да | string |   |
| `description` | Да | string |   |
| `env_from` | Да | array&lt;string&gt; | Имена переменных окружения worker, входящих в сервис, без значений.  |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "code",
    "name",
    "description",
    "env_from"
  ],
  "properties": {
    "code": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9_-]{0,63}$"
    },
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "env_from": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Names of worker environment variables included in this service; never values."
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
