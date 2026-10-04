# Service



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `code` | Да | string |   |
| `name` | Да | string |   |
| `description` | Да | string |   |
| `env_from` | Да | array&lt;string&gt; | Отсортированные имена переменных окружения без значений.  |

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
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "env_from": {
      "description": "Sorted environment variable names; never their values.",
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
