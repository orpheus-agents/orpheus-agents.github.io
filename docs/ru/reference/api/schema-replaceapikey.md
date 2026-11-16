# ReplaceAPIKey



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `api_key` | Да | string |  minLength: <code>1</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "api_key"
  ],
  "properties": {
    "api_key": {
      "type": "string",
      "minLength": 1,
      "writeOnly": true
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
