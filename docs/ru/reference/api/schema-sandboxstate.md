# SandboxState



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `error` | Да | [Error](schema-error.md) / null |   |
| `id` | Да | string / null | ID песочницы AgentBox, если известен. Сохраняется для диагностики после удаления или потери песочницы и не гарантирует её доступность.  |
| `last_known_state` | Да | string / null |   |
| `state` | Да | string |  enum: <code>["not_created","provisioning","ready","pausing","paused","resuming","deleting","deleted","unavailable"]</code> |
| `workspace` | Да | string / null | Абсолютный путь рабочего каталога, определённый при подготовке песочницы, если известен.  |

## JSON Schema

```json
{
  "properties": {
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
    "id": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
      "description": "AgentBox sandbox ID, if known. Retained for diagnostics after deletion or loss; does not guarantee accessibility."
    },
    "last_known_state": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
      "title": "Last Known State"
    },
    "state": {
      "enum": [
        "not_created",
        "provisioning",
        "ready",
        "pausing",
        "paused",
        "resuming",
        "deleting",
        "deleted",
        "unavailable"
      ],
      "title": "State",
      "type": "string"
    },
    "workspace": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
      "description": "Absolute workspace path resolved during sandbox preparation, if known."
    }
  },
  "required": [
    "state",
    "last_known_state",
    "error",
    "id",
    "workspace"
  ],
  "title": "SandboxState",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
