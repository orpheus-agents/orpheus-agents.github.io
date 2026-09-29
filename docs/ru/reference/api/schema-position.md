# Position



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `item_index` | Да | integer |   |
| `run_number` | Да | integer |   |

## JSON Schema

```json
{
  "properties": {
    "item_index": {
      "title": "Item Index",
      "type": "integer"
    },
    "run_number": {
      "title": "Run Number",
      "type": "integer"
    }
  },
  "required": [
    "run_number",
    "item_index"
  ],
  "title": "Position",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
