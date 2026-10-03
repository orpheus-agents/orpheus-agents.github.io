# CodexProfile



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `effort` | Нет | string |  enum: <code>["none","minimal","low","medium","high","xhigh","max","ultra"]</code> |
| `summary` | Нет | string |  enum: <code>["auto","concise","detailed","none"]</code> |
| `personality` | Нет | string |  enum: <code>["none","friendly","pragmatic"]</code> |
| `service_tier` | Нет | string |  minLength: <code>1</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "effort": {
      "type": "string",
      "enum": [
        "none",
        "minimal",
        "low",
        "medium",
        "high",
        "xhigh",
        "max",
        "ultra"
      ]
    },
    "summary": {
      "type": "string",
      "enum": [
        "auto",
        "concise",
        "detailed",
        "none"
      ]
    },
    "personality": {
      "type": "string",
      "enum": [
        "none",
        "friendly",
        "pragmatic"
      ]
    },
    "service_tier": {
      "type": "string",
      "minLength": 1
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
