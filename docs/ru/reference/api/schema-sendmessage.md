# SendMessage



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `messages` | Да | array&lt;[TextMessage](schema-textmessage.md)&gt; | Упорядоченные сообщения пользователя, принимаемые атомарно для активного запуска. minItems: <code>1</code><br>maxItems: <code>256</code> |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "messages": {
      "description": "Ordered user messages accepted atomically for the active run.",
      "type": "array",
      "minItems": 1,
      "maxItems": 256,
      "items": {
        "$ref": "#/components/schemas/TextMessage"
      }
    }
  },
  "required": [
    "messages"
  ],
  "title": "SendMessage",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
