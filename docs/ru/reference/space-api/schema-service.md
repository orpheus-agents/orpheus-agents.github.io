# Service



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `code` | Да | string |  pattern: <code>"^[a-z][a-z0-9_-]{0,63}$"</code> |
| `name` | Да | string |   |
| `description` | Да | string |   |
| `env_names` | Да | array&lt;string&gt; | Отсортированные имена переменных, которые клиент получает от сервиса.  |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "code",
    "name",
    "description",
    "env_names"
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
    "env_names": {
      "type": "array",
      "uniqueItems": true,
      "items": {
        "type": "string"
      },
      "description": "Sorted destination variable names supplied by this service to the client."
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
