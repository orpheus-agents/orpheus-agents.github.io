# CreateSession



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `allow_multiple_runs` | No | boolean | Immutable session policy. If false, only the run created with the session is allowed and its sandbox is deleted after completion, failure or cancellation. If true, the sandbox is paused for subsequent runs. Recovery and messages within the current run are allowed in either mode. default: <code>false</code> |
| `namespace` | No | string | Logical integration or workflow name. Opaque identifier, 1–128 UTF-8 bytes; no NUL or whitespace-only value. Compared exactly, without normalization. minLength: <code>1</code><br>maxLength: <code>128</code> |
| `external_key` | No | string | Source-qualified external object key; not unique across sessions. Opaque identifier, 1–512 UTF-8 bytes; no NUL or whitespace-only value. Compared exactly, without normalization. minLength: <code>1</code><br>maxLength: <code>512</code> |
| `input_fingerprint` | No | string | Opaque input snapshot version for the first run; does not deduplicate requests. Opaque identifier, 1–256 UTF-8 bytes; no NUL or whitespace-only value. Compared exactly, without normalization. minLength: <code>1</code><br>maxLength: <code>256</code> |
| `configuration` | Yes | [ConfigurationInput](schema-configurationinput.md) |   |
| `messages` | Yes | array&lt;[TextMessage](schema-textmessage.md)&gt; | Ordered user messages accepted atomically. The last starts the run; earlier messages are injected into the agent context first. minItems: <code>1</code><br>maxItems: <code>256</code> |
| `env` | No | object | Explicit environment variables for the first run's before_run and after_run hooks only. Override session sources with the same names; never passed to the harness, after_create, or before_remove. additionalProperties: <code>{"type":"string"}</code> |
| `env_from` | No | array&lt;string&gt; | Allowlisted orchestrator environment variable names for the first run's before_run and after_run hooks only. Resolved before each hook; override session sources and are never passed to the harness, after_create, or before_remove.  |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "allow_multiple_runs": {
      "description": "Immutable session policy. If false, only the run created with the session is allowed and its sandbox is deleted after completion, failure or cancellation. If true, the sandbox is paused for subsequent runs. Recovery and messages within the current run are allowed in either mode.",
      "type": "boolean",
      "default": false
    },
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

[All schemas](schemas.md) · [HTTP API](index.md)
