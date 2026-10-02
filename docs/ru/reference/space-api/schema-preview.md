# Preview



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `times` | Да | array&lt;string&gt; |  minItems: <code>5</code><br>maxItems: <code>5</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "times"
  ],
  "properties": {
    "times": {
      "type": "array",
      "minItems": 5,
      "maxItems": 5,
      "items": {
        "type": "string",
        "format": "date-time"
      }
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
