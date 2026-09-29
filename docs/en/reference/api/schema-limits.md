# Limits



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `max_session_tokens` | Yes | integer | Session-wide input and output token budget. Omission uses DEFAULT_MAX_SESSION_TOKENS (100000000 by default); explicit null is invalid. format: <code>"int64"</code><br>minimum: <code>1</code><br>maximum: <code>9223372036854776000</code> |
| `run_timeout_seconds` | Yes | integer | Agent execution deadline, independent of the periodically renewed sandbox timeout. AgentBox plan limits on uninterrupted sandbox lifetime still apply. default: <code>3600</code><br>maximum: <code>2147483647</code><br>exclusiveMinimum: <code>0</code> |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "max_session_tokens": {
      "description": "Session-wide input and output token budget. Omission uses DEFAULT_MAX_SESSION_TOKENS (100000000 by default); explicit null is invalid.",
      "type": "integer",
      "format": "int64",
      "minimum": 1,
      "maximum": 9223372036854776000
    },
    "run_timeout_seconds": {
      "description": "Agent execution deadline, independent of the periodically renewed sandbox timeout. AgentBox plan limits on uninterrupted sandbox lifetime still apply.",
      "default": 3600,
      "exclusiveMinimum": 0,
      "maximum": 2147483647,
      "title": "Run Timeout Seconds",
      "type": "integer"
    }
  },
  "required": [
    "run_timeout_seconds",
    "max_session_tokens"
  ],
  "title": "Limits",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
