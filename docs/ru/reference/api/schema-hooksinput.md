# HooksInput



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `after_create` | Нет | string | Текст исполняемого скрипта с shebang. Выполняется один раз после создания рабочего окружения.  |
| `before_run` | Нет | string | Текст исполняемого скрипта с shebang. Выполняется перед каждой задачей.  |
| `after_run` | Нет | string | Текст исполняемого скрипта с shebang. Выполняется после подтверждённого завершения агента, до паузы или удаления песочницы.  |
| `before_remove` | Нет | string | Поле принимается API, но хук не выполняется, в том числе перед автоматическим удалением песочницы.  |
| `timeout_seconds` | Нет | integer | Таймаут каждого выполнения хука. default: <code>300</code><br>minimum: <code>1</code><br>maximum: <code>2147483647</code> |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "after_create": {
      "description": "Executable script text with a shebang; runs once after workspace creation.",
      "type": "string"
    },
    "before_run": {
      "description": "Executable script text with a shebang; runs before every assignment.",
      "type": "string"
    },
    "after_run": {
      "description": "Executable script text with a shebang; runs after confirmed agent completion, before sandbox pause or deletion.",
      "type": "string"
    },
    "before_remove": {
      "description": "Reserved for future use; never called, including before automatic sandbox deletion.",
      "type": "string"
    },
    "timeout_seconds": {
      "description": "Timeout for each hook invocation.",
      "type": "integer",
      "default": 300,
      "minimum": 1,
      "maximum": 2147483647
    }
  },
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
