# OccurrencePage



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `items` | Да | array&lt;[Occurrence](schema-occurrence.md)&gt; |   |
| `next_cursor` | Да | string / null |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "items",
    "next_cursor"
  ],
  "properties": {
    "items": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/Occurrence"
      }
    },
    "next_cursor": {
      "type": "string",
      "nullable": true
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
