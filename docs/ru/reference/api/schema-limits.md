# Limits



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `max_session_tokens` | Да | integer | Бюджет входных и выходных токенов всей сессии. Если поле отсутствует, применяется DEFAULT_MAX_SESSION_TOKENS, по умолчанию 100000000. Явный null запрещён. format: <code>"int64"</code><br>minimum: <code>1</code><br>maximum: <code>9223372036854776000</code> |
| `run_timeout_seconds` | Да | integer | Таймаут исполнения агента, независимый от продлеваемого таймаута песочницы. Ограничение непрерывной жизни песочницы определяется тарифом AgentBox. default: <code>3600</code><br>maximum: <code>2147483647</code><br>exclusiveMinimum: <code>0</code> |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "max_session_tokens": {
      "description": "Session-wide input and output token budget. Omission uses DEFAULT_MAX_SESSION_TOKENS (100000000 by default); explicit null is invalid.",
      "type": "integer",
      "format": "int64",
      "minimum": 1,
      "maximum": 9223372036854776000
    },
    "run_timeout_seconds": {
      "description": "Agent execution deadline, independent of the periodically renewed sandbox timeout. AgentBox plan limits on uninterrupted sandbox lifetime still apply.",
      "default": 3600,
      "exclusiveMinimum": 0,
      "maximum": 2147483647,
      "title": "Run Timeout Seconds",
      "type": "integer"
    }
  },
  "required": [
    "run_timeout_seconds",
    "max_session_tokens"
  ],
  "title": "Limits",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
