# HooksInput



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `after_create` | No | string | Executable script text with a shebang; runs once after workspace creation.  |
| `before_run` | No | string | Executable script text with a shebang; runs before every assignment.  |
| `after_run` | No | string | Executable script text with a shebang; runs after confirmed agent completion, before sandbox pause or deletion.  |
| `before_remove` | No | string | Accepted by the API but never executed, including before automatic sandbox deletion. Do not use for cleanup.  |
| `timeout_seconds` | No | integer | Timeout for each hook invocation. default: <code>300</code><br>minimum: <code>1</code><br>maximum: <code>2147483647</code> |

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

[All schemas](schemas.md) · [HTTP API](index.md)
