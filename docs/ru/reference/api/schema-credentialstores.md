# CredentialStores



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `items` | Да | array&lt;string&gt; |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "items"
  ],
  "properties": {
    "items": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
