# Run



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `usage` | Да | [Usage](schema-usage.md) |   |
| `phase` | Да | string / null |   |
| `agent_status` | Да | string / null |   |
| `agent_error` | Да | [Error](schema-error.md) / null |   |
| `hooks` | Да | array&lt;[HookResult](schema-hookresult.md)&gt; |   |
| `env_names` | Да | array&lt;string&gt; | Отсортированные имена явных переменных запуска. Значения не возвращаются.  |
| `services` | Да | array&lt;[Service](schema-service.md)&gt; | Неизменяемые описания сервисов и имена ENV, определённые при принятии запроса.  |
| `env_from` | Да | array&lt;string&gt; | Отсортированные имена переменных окружения оркестратора для запуска, включая ENV выбранных сервисов.  |
| `input_fingerprint` | Да | string / null | Версия входных данных при приёме запуска. От 1 до 256 байт UTF-8. NUL и строки только из пробелов запрещены. Точное сравнение.  |
| `cancel_requested_at` | Да | string / null |   |
| `created_at` | Да | string |  format: <code>"date-time"</code> |
| `deadline_at` | Да | string / null |   |
| `error` | Да | [Error](schema-error.md) / null |   |
| `execution_started_at` | Да | string / null |   |
| `final_message` | Да | [Message](schema-message.md) / null |   |
| `finished_at` | Да | string / null |   |
| `id` | Да | string |  format: <code>"uuid"</code> |
| `number` | Да | integer |   |
| `observation` | Да | string / null |   |
| `session_id` | Да | string |  format: <code>"uuid"</code> |
| `status` | Да | [RunStatus](schema-runstatus.md) |   |
| `stop_method` | Да | string / null | Способ остановки агента при отмене. null до подтверждения или при отмене до первой попытки отправки задачи, включая отмену пользователем.  |
| `stop_reason` | Да | string / null |   |

## JSON Schema

```json
{
  "properties": {
    "usage": {
      "$ref": "#/components/schemas/Usage"
    },
    "phase": {
      "anyOf": [
        {
          "type": "string",
          "enum": [
            "preparation",
            "after_create",
            "before_run",
            "agent",
            "after_run"
          ]
        },
        {
          "type": "null"
        }
      ]
    },
    "agent_status": {
      "anyOf": [
        {
          "type": "string",
          "enum": [
            "completed",
            "failed",
            "cancelled"
          ]
        },
        {
          "type": "null"
        }
      ]
    },
    "agent_error": {
      "anyOf": [
        {
          "$ref": "#/components/schemas/Error"
        },
        {
          "type": "null"
        }
      ]
    },
    "hooks": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/HookResult"
      }
    },
    "env_names": {
      "description": "Sorted names of explicit variables supplied for this run; values are never returned.",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "services": {
      "description": "Immutable service descriptions and environment names resolved when accepted.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/Service"
      }
    },
    "env_from": {
      "description": "Sorted orchestrator environment variable names for this run, including expanded services.",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "input_fingerprint": {
      "description": "Input snapshot version supplied when the run was accepted. Opaque identifier, 1–256 UTF-8 bytes; no NUL or whitespace-only value. Compared exactly, without normalization.",
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "null"
        }
      ]
    },
    "cancel_requested_at": {
      "anyOf": [
        {
          "format": "date-time",
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
      "title": "Cancel Requested At"
    },
    "created_at": {
      "format": "date-time",
      "title": "Created At",
      "type": "string"
    },
    "deadline_at": {
      "anyOf": [
        {
          "format": "date-time",
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
      "title": "Deadline At"
    },
    "error": {
      "anyOf": [
        {
          "$ref": "#/components/schemas/Error"
        },
        {
          "type": "null"
        }
      ]
    },
    "execution_started_at": {
      "anyOf": [
        {
          "format": "date-time",
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
      "title": "Execution Started At"
    },
    "final_message": {
      "anyOf": [
        {
          "$ref": "#/components/schemas/Message"
        },
        {
          "type": "null"
        }
      ]
    },
    "finished_at": {
      "anyOf": [
        {
          "format": "date-time",
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
      "title": "Finished At"
    },
    "id": {
      "format": "uuid",
      "title": "Id",
      "type": "string"
    },
    "number": {
      "title": "Number",
      "type": "integer"
    },
    "observation": {
      "anyOf": [
        {
          "enum": [
            "attached",
            "reconnecting",
            "uncertain"
          ],
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
      "title": "Observation"
    },
    "session_id": {
      "format": "uuid",
      "title": "Session Id",
      "type": "string"
    },
    "status": {
      "$ref": "#/components/schemas/RunStatus"
    },
    "stop_method": {
      "description": "How cancellation stopped agent execution. Null until confirmed, or if the run was cancelled before the first dispatch attempt, including user-requested cancellation.",
      "anyOf": [
        {
          "enum": [
            "graceful",
            "forced"
          ],
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
      "title": "Stop Method"
    },
    "stop_reason": {
      "anyOf": [
        {
          "enum": [
            "user_request",
            "run_timeout",
            "token_limit"
          ],
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
      "title": "Stop Reason"
    }
  },
  "required": [
    "usage",
    "phase",
    "agent_status",
    "agent_error",
    "hooks",
    "input_fingerprint",
    "env_names",
    "env_from",
    "services",
    "id",
    "session_id",
    "number",
    "status",
    "observation",
    "created_at",
    "execution_started_at",
    "deadline_at",
    "finished_at",
    "cancel_requested_at",
    "stop_reason",
    "stop_method",
    "final_message",
    "error"
  ],
  "title": "Run",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
