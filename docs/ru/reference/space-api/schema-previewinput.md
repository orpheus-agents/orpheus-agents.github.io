# PreviewInput



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `cron` | Да | string |  minLength: <code>1</code> |
| `timezone` | Да | string |  minLength: <code>1</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "cron",
    "timezone"
  ],
  "properties": {
    "cron": {
      "type": "string",
      "minLength": 1
    },
    "timezone": {
      "type": "string",
      "minLength": 1
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
