# CreateRun



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `input_fingerprint` | No | string | Opaque input snapshot version for this run; does not deduplicate requests. Opaque identifier, 1–256 UTF-8 bytes; no NUL or whitespace-only value. Compared exactly, without normalization. minLength: <code>1</code><br>maxLength: <code>256</code> |
| `messages` | Yes | array&lt;[TextMessage](schema-textmessage.md)&gt; | Ordered user messages accepted atomically. The last starts the run; earlier messages are injected into the agent context first. minItems: <code>1</code><br>maxItems: <code>256</code> |
| `env` | No | object | Explicit environment variables available only to this run's before_run and after_run hooks. Override session sources with the same names; never passed to the harness, after_create, or before_remove. additionalProperties: <code>{"type":"string"}</code> |
| `services` | No | [ServiceCodes](schema-servicecodes.md) | Services available only to this run's before_run and after_run hooks, as with run env_from. Never passed to the harness, after_create, or before_remove.  |
| `env_from` | No | array&lt;string&gt; | Allowlisted orchestrator environment variable names available only to this run's before_run and after_run hooks. Resolved before each hook; override session sources and are never passed to the harness, after_create, or before_remove.  |

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
    "services": {
      "description": "Services available only to this run's before_run and after_run hooks, as with run env_from. Never passed to the harness, after_create, or before_remove.",
      "$ref": "#/components/schemas/ServiceCodes"
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

[All schemas](schemas.md) · [HTTP API](index.md)
