# Template



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `id` | Да | string |  format: <code>"uuid"</code> |
| `name` | Да | string |   |
| `template_name` | Да | string |   |
| `tag` | Да | string / null |   |
| `description` | Да | string / null |   |
| `active` | Да | boolean |   |
| `is_default` | Да | boolean |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "id",
    "name",
    "template_name",
    "tag",
    "description",
    "active",
    "is_default"
  ],
  "properties": {
    "id": {
      "type": "string",
      "format": "uuid"
    },
    "name": {
      "type": "string"
    },
    "template_name": {
      "type": "string"
    },
    "tag": {
      "type": "string",
      "nullable": true
    },
    "description": {
      "type": "string",
      "nullable": true
    },
    "active": {
      "type": "boolean"
    },
    "is_default": {
      "type": "boolean"
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
