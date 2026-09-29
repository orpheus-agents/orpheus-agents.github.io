# MessageItem



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `message` | Да | [Message](schema-message.md) |   |
| `type` | Да | string |  const: <code>"message"</code><br>default: <code>"message"</code> |

## JSON Schema

```json
{
  "properties": {
    "message": {
      "$ref": "#/components/schemas/Message"
    },
    "type": {
      "const": "message",
      "default": "message",
      "title": "Type",
      "type": "string"
    }
  },
  "required": [
    "message",
    "type"
  ],
  "title": "MessageItem",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
