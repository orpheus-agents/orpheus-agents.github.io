# CreateSession



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `namespace` | Нет | string | Имя интеграции или workflow. От 1 до 128 байт UTF-8. NUL и строки только из пробелов запрещены. Точное сравнение без нормализации. minLength: <code>1</code><br>maxLength: <code>128</code> |
| `external_key` | Нет | string | Ключ внешнего объекта с указанием источника. Не уникален между сессиями. От 1 до 512 байт UTF-8. NUL и строки только из пробелов запрещены. Точное сравнение. minLength: <code>1</code><br>maxLength: <code>512</code> |
| `input_fingerprint` | Нет | string | Версия входных данных первого запуска. Не устраняет дубли запросов. От 1 до 256 байт UTF-8. NUL и строки только из пробелов запрещены. Точное сравнение. minLength: <code>1</code><br>maxLength: <code>256</code> |
| `configuration` | Да | [ConfigurationInput](schema-configurationinput.md) |   |
| `messages` | Да | array&lt;[TextMessage](schema-textmessage.md)&gt; | Упорядоченные сообщения пользователя, принимаемые атомарно. Последнее запускает задачу. Предыдущие сначала добавляются в контекст агента. minItems: <code>1</code><br>maxItems: <code>256</code> |
| `env` | Нет | object | Явные переменные только для before_run и after_run первого запуска. Перекрывают одноимённые значения сессии. Не передаются агенту, after_create и before_remove. additionalProperties: <code>{"type":"string"}</code> |
| `env_from` | Нет | array&lt;string&gt; | Разрешённые имена ENV оркестратора только для before_run и after_run первого запуска. Значения определяются перед каждым хуком и перекрывают сессионные. Не передаются агенту, after_create и before_remove.  |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "namespace": {
      "description": "Logical integration or workflow name. Opaque identifier, 1–128 UTF-8 bytes; no NUL or whitespace-only value. Compared exactly, without normalization.",
      "type": "string",
      "minLength": 1,
      "maxLength": 128
    },
    "external_key": {
      "description": "Source-qualified external object key; not unique across sessions. Opaque identifier, 1–512 UTF-8 bytes; no NUL or whitespace-only value. Compared exactly, without normalization.",
      "type": "string",
      "minLength": 1,
      "maxLength": 512
    },
    "input_fingerprint": {
      "description": "Opaque input snapshot version for the first run; does not deduplicate requests. Opaque identifier, 1–256 UTF-8 bytes; no NUL or whitespace-only value. Compared exactly, without normalization.",
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    },
    "configuration": {
      "$ref": "#/components/schemas/ConfigurationInput"
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
      "description": "Explicit environment variables for the first run's before_run and after_run hooks only. Override session sources with the same names; never passed to the harness, after_create, or before_remove.",
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    },
    "env_from": {
      "description": "Allowlisted orchestrator environment variable names for the first run's before_run and after_run hooks only. Resolved before each hook; override session sources and are never passed to the harness, after_create, or before_remove.",
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "required": [
    "configuration",
    "messages"
  ],
  "title": "CreateSession",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
