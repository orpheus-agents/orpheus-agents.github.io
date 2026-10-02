# Error



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `code` | Да | string |   |
| `details` | Да | array&lt;[ErrorDetail](schema-errordetail.md)&gt; |   |
| `message` | Да | string | Сообщение об ошибке для пользователя. Ошибки исполнения включают исходное сообщение харнеса и доступные дополнительные сведения. Если их нет, возвращается общее сообщение.  |
| `phase` | Да | string / null |   |

## JSON Schema

```json
{
  "properties": {
    "code": {
      "title": "Code",
      "type": "string"
    },
    "details": {
      "items": {
        "$ref": "#/components/schemas/ErrorDetail"
      },
      "title": "Details",
      "type": "array"
    },
    "message": {
      "description": "Human-readable error message. Harness execution failures include the original harness message and additional details when available; otherwise a generic message is returned.",
      "title": "Message",
      "type": "string"
    },
    "phase": {
      "anyOf": [
        {
          "enum": [
            "preparation",
            "execution",
            "finalization",
            "recovery"
          ],
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
      "title": "Phase"
    }
  },
  "required": [
    "code",
    "message",
    "phase",
    "details"
  ],
  "title": "Error",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
