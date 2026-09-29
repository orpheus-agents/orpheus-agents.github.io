# TruncatedResult



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `exit_code` | Нет | integer / null |   |
| `head` | Да | string |   |
| `original_bytes` | Да | integer / null |   |
| `source_type` | Нет | string |  enum: <code>["text","json"]</code><br>default: <code>"text"</code> |
| `tail` | Да | string |   |
| `type` | Да | string |  const: <code>"truncated_text"</code><br>default: <code>"truncated_text"</code> |

## JSON Schema

```json
{
  "properties": {
    "exit_code": {
      "anyOf": [
        {
          "type": "integer"
        },
        {
          "type": "null"
        }
      ],
      "title": "Exit Code"
    },
    "head": {
      "title": "Head",
      "type": "string"
    },
    "original_bytes": {
      "anyOf": [
        {
          "type": "integer"
        },
        {
          "type": "null"
        }
      ],
      "title": "Original Bytes"
    },
    "source_type": {
      "default": "text",
      "enum": [
        "text",
        "json"
      ],
      "title": "Source Type",
      "type": "string"
    },
    "tail": {
      "title": "Tail",
      "type": "string"
    },
    "type": {
      "const": "truncated_text",
      "default": "truncated_text",
      "title": "Type",
      "type": "string"
    }
  },
  "required": [
    "head",
    "tail",
    "original_bytes",
    "type"
  ],
  "title": "TruncatedResult",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
