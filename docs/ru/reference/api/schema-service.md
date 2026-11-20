# Service



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `code` | Да | string |   |
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
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "env_names": {
      "description": "Sorted destination variable names supplied by this service to the client.",
      "type": "array",
      "uniqueItems": true,
      "items": {
        "type": "string"
      }
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
