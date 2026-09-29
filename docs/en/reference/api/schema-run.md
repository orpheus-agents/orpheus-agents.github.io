# Run



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `usage` | Yes | [Usage](schema-usage.md) |   |
| `phase` | Yes | string / null |   |
| `agent_status` | Yes | string / null |   |
| `agent_error` | Yes | [Error](schema-error.md) / null |   |
| `hooks` | Yes | array&lt;[HookResult](schema-hookresult.md)&gt; |   |
| `env_names` | Yes | array&lt;string&gt; | Sorted names of explicit variables supplied for this run; values are never returned.  |
| `env_from` | Yes | array&lt;string&gt; | Sorted orchestrator environment variable names supplied for this run.  |
| `input_fingerprint` | Yes | string / null | Input snapshot version supplied when the run was accepted. Opaque identifier, 1–256 UTF-8 bytes; no NUL or whitespace-only value. Compared exactly, without normalization.  |
| `cancel_requested_at` | Yes | string / null |   |
| `created_at` | Yes | string |  format: <code>"date-time"</code> |
| `deadline_at` | Yes | string / null |   |
| `error` | Yes | [Error](schema-error.md) / null |   |
| `execution_started_at` | Yes | string / null |   |
| `final_message` | Yes | [Message](schema-message.md) / null |   |
| `finished_at` | Yes | string / null |   |
| `id` | Yes | string |  format: <code>"uuid"</code> |
| `number` | Yes | integer |   |
| `observation` | Yes | string / null |   |
| `session_id` | Yes | string |  format: <code>"uuid"</code> |
| `status` | Yes | [RunStatus](schema-runstatus.md) |   |
| `stop_method` | Yes | string / null | How cancellation stopped agent execution. Null until confirmed, or if the run was cancelled before the first dispatch attempt, including user-requested cancellation.  |
| `stop_reason` | Yes | string / null |   |

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
    "env_from": {
      "description": "Sorted orchestrator environment variable names supplied for this run.",
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

[All schemas](schemas.md) · [HTTP API](index.md)
