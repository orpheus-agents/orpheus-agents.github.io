# AgentInput



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `instructions` | Нет | string |  default: <code>""</code> |
| `model` | Нет | string |  minLength: <code>1</code> |
| `profile` | Да | string |  minLength: <code>1</code> |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "instructions": {
      "default": "",
      "title": "Instructions",
      "type": "string"
    },
    "model": {
      "minLength": 1,
      "title": "Model",
      "type": "string"
    },
    "profile": {
      "minLength": 1,
      "title": "Profile",
      "type": "string"
    }
  },
  "required": [
    "profile"
  ],
  "title": "AgentInput",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
