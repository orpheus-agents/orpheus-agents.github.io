# OpenCodeProfile



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `variant` | Нет | string | ID варианта, который поддерживает выбранная модель OpenCode. minLength: <code>1</code><br>maxLength: <code>255</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "variant": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255,
      "description": "Native variant ID supported by the selected OpenCode model."
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
