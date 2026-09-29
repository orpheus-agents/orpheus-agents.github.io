# ErrorDetail

Пути проверки начинаются с body, header, query или path. Ошибки хуков указывают configuration.hooks.&lt;name&gt;. Коды не содержат входные значения и сообщения внутреннего валидатора.

**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `code` | Да | string |  enum: <code>["required","invalid_type","invalid_value","unknown_field"]</code> |
| `path` | Да | array&lt;string / integer&gt; |   |

## JSON Schema

```json
{
  "description": "Validation paths start with body, header, query, or path. Hook execution errors identify configuration.hooks.<name>; codes never contain input values or native validator messages.",
  "properties": {
    "code": {
      "enum": [
        "required",
        "invalid_type",
        "invalid_value",
        "unknown_field"
      ],
      "title": "Code",
      "type": "string"
    },
    "path": {
      "items": {
        "anyOf": [
          {
            "type": "string"
          },
          {
            "type": "integer"
          }
        ]
      },
      "title": "Path",
      "type": "array"
    }
  },
  "required": [
    "path",
    "code"
  ],
  "title": "ErrorDetail",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
