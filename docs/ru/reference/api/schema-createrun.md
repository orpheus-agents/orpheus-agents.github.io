# CreateRun



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `input_fingerprint` | Нет | string | Версия входных данных запуска. Не устраняет дубли запросов. От 1 до 256 байт UTF-8. NUL и строки только из пробелов запрещены. Точное сравнение. minLength: <code>1</code><br>maxLength: <code>256</code> |
| `messages` | Да | array&lt;[TextMessage](schema-textmessage.md)&gt; | Упорядоченные сообщения пользователя, принимаемые атомарно. Последнее запускает задачу. Предыдущие сначала добавляются в контекст агента. minItems: <code>1</code><br>maxItems: <code>256</code> |
| `env` | Нет | object | Явные переменные только для before_run и after_run этого запуска. Перекрывают одноимённые значения сессии. Не передаются агенту, after_create и before_remove. additionalProperties: <code>{"type":"string"}</code> |
| `env_from` | Нет | array&lt;string&gt; | Разрешённые имена ENV оркестратора только для before_run и after_run этого запуска. Значения определяются перед каждым хуком и перекрывают сессионные. Не передаются агенту, after_create и before_remove.  |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "input_fingerprint": {
      "description": "Opaque input snapshot version for this run; does not deduplicate requests. Opaque identifier, 1–256 UTF-8 bytes; no NUL or whitespace-only value. Compared exactly, without normalization.",
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    },
    "messages": {
      "description": "Ordered user messages accepted atomically. The last starts the run; earlier messages are injected into the agent context first.",
      "type": "array",
      "minItems": 1,
      "maxItems": 256,
      "items": {
        "$ref": "#/components/schemas/TextMessage"
      }
    },
    "env": {
      "description": "Explicit environment variables available only to this run's before_run and after_run hooks. Override session sources with the same names; never passed to the harness, after_create, or before_remove.",
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    },
    "env_from": {
      "description": "Allowlisted orchestrator environment variable names available only to this run's before_run and after_run hooks. Resolved before each hook; override session sources and are never passed to the harness, after_create, or before_remove.",
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "required": [
    "messages"
  ],
  "title": "CreateRun",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
