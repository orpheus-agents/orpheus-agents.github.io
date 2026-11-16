# Templates



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `next_cursor` | Да | string / null |   |
| `prev_cursor` | Да | string / null |   |
| `items` | Да | array&lt;[Template](schema-template.md)&gt; |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "items",
    "next_cursor",
    "prev_cursor"
  ],
  "properties": {
    "next_cursor": {
      "type": "string",
      "nullable": true
    },
    "prev_cursor": {
      "type": "string",
      "nullable": true
    },
    "items": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/Template"
      }
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
