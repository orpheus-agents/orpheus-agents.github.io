# Error



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `code` | Да | string |   |
| `details` | Да | array&lt;[ErrorDetail](schema-errordetail.md)&gt; |   |
| `message` | Да | string |   |
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
