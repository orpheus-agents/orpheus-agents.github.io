# Profiles



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `items` | Да | array&lt;[Profile](schema-profile.md)&gt; |   |
| `next_cursor` | Да | string / null |   |
| `prev_cursor` | Да | string / null |   |

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
    "items": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/Profile"
      }
    },
    "next_cursor": {
      "type": [
        "string",
        "null"
      ]
    },
    "prev_cursor": {
      "type": [
        "string",
        "null"
      ]
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
