# AgentConfiguration



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `instructions` | Да | string |   |
| `model` | Да | string |   |
| `profile` | Да | string |   |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "instructions": {
      "title": "Instructions",
      "type": "string"
    },
    "model": {
      "title": "Model",
      "type": "string"
    },
    "profile": {
      "title": "Profile",
      "type": "string"
    }
  },
  "required": [
    "profile",
    "model",
    "instructions"
  ],
  "title": "AgentConfiguration",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
