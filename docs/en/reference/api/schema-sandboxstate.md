# SandboxState



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `error` | Yes | [Error](schema-error.md) / null |   |
| `id` | Yes | string / null | AgentBox sandbox ID, if known. Retained for diagnostics after deletion or loss; does not guarantee accessibility.  |
| `last_known_state` | Yes | string / null |   |
| `state` | Yes | string |  enum: <code>["not_created","provisioning","ready","pausing","paused","resuming","deleting","deleted","unavailable"]</code> |
| `workspace` | Yes | string / null | Absolute workspace path resolved during sandbox preparation, if known.  |

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

[All schemas](schemas.md) · [HTTP API](index.md)
