# Session



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `allow_multiple_runs` | Да | boolean | Неизменяемый режим сессии, разрешающий следующие запуски. При false песочница удаляется после завершения первого запуска. История сессии остаётся доступной.  |
| `last_run_created_at` | Да | string | Время создания последнего запуска, а не последней активности. format: <code>"date-time"</code> |
| `usage` | Да | [Usage](schema-usage.md) |   |
| `phase` | Да | string / null |   |
| `namespace` | Да | string / null | Имя интеграции или workflow. От 1 до 128 байт UTF-8. NUL и строки только из пробелов запрещены. Точное сравнение без нормализации.  |
| `external_key` | Да | string / null | Ключ внешнего объекта с указанием источника. Не уникален между сессиями. От 1 до 512 байт UTF-8. NUL и строки только из пробелов запрещены. Точное сравнение.  |
| `active_run_id` | Да | string / null |   |
| `configuration` | Да | [Configuration](schema-configuration.md) |   |
| `created_at` | Да | string |  format: <code>"date-time"</code> |
| `error` | Да | [Error](schema-error.md) / null |   |
| `final_message` | Да | [Message](schema-message.md) / null |   |
| `id` | Да | string |  format: <code>"uuid"</code> |
| `last_run_id` | Да | string |  format: <code>"uuid"</code> |
| `sandbox` | Да | [SandboxState](schema-sandboxstate.md) |   |
| `status` | Да | [RunStatus](schema-runstatus.md) |   |

## JSON Schema

```json
{
  "properties": {
    "allow_multiple_runs": {
      "description": "Immutable policy allowing subsequent runs. False means the sandbox is deleted after the first run terminates; session history remains available.",
      "type": "boolean"
    },
    "last_run_created_at": {
      "description": "Creation time of the latest run, not the last activity time.",
      "format": "date-time",
      "type": "string"
    },
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
    "namespace": {
      "description": "Logical integration or workflow name. Opaque identifier, 1–128 UTF-8 bytes; no NUL or whitespace-only value. Compared exactly, without normalization.",
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "null"
        }
      ]
    },
    "external_key": {
      "description": "Source-qualified external object key; not unique across sessions. Opaque identifier, 1–512 UTF-8 bytes; no NUL or whitespace-only value. Compared exactly, without normalization.",
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "null"
        }
      ]
    },
    "active_run_id": {
      "anyOf": [
        {
          "format": "uuid",
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
      "title": "Active Run Id"
    },
    "configuration": {
      "$ref": "#/components/schemas/Configuration"
    },
    "created_at": {
      "format": "date-time",
      "title": "Created At",
      "type": "string"
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
    "id": {
      "format": "uuid",
      "title": "Id",
      "type": "string"
    },
    "last_run_id": {
      "format": "uuid",
      "title": "Last Run Id",
      "type": "string"
    },
    "sandbox": {
      "$ref": "#/components/schemas/SandboxState"
    },
    "status": {
      "$ref": "#/components/schemas/RunStatus"
    }
  },
  "required": [
    "allow_multiple_runs",
    "usage",
    "phase",
    "namespace",
    "external_key",
    "id",
    "created_at",
    "last_run_created_at",
    "configuration",
    "sandbox",
    "active_run_id",
    "last_run_id",
    "status",
    "final_message",
    "error"
  ],
  "title": "Session",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
