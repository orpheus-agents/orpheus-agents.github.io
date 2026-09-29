# AggregateUsage

Totals for runs accepted in the period. Cached input and reasoning output are included in input and output respectively. The breakdown is recorded only since collection began; historical usage is not reconstructed. Decimal strings preserve values beyond JavaScript Number precision.

**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `input_tokens` | Yes | string |  pattern: <code>"^(0&#124;[1-9][0-9]*)$"</code> |
| `cached_input_tokens` | Yes | string |  pattern: <code>"^(0&#124;[1-9][0-9]*)$"</code> |
| `output_tokens` | Yes | string |  pattern: <code>"^(0&#124;[1-9][0-9]*)$"</code> |
| `reasoning_output_tokens` | Yes | string |  pattern: <code>"^(0&#124;[1-9][0-9]*)$"</code> |
| `total_tokens` | Yes | string |  pattern: <code>"^(0&#124;[1-9][0-9]*)$"</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "input_tokens",
    "cached_input_tokens",
    "output_tokens",
    "reasoning_output_tokens",
    "total_tokens"
  ],
  "description": "Totals for runs accepted in the period. Cached input and reasoning output are included in input and output respectively. The breakdown is recorded only since collection began; historical usage is not reconstructed. Decimal strings preserve values beyond JavaScript Number precision.",
  "properties": {
    "input_tokens": {
      "type": "string",
      "pattern": "^(0|[1-9][0-9]*)$"
    },
    "cached_input_tokens": {
      "type": "string",
      "pattern": "^(0|[1-9][0-9]*)$"
    },
    "output_tokens": {
      "type": "string",
      "pattern": "^(0|[1-9][0-9]*)$"
    },
    "reasoning_output_tokens": {
      "type": "string",
      "pattern": "^(0|[1-9][0-9]*)$"
    },
    "total_tokens": {
      "type": "string",
      "pattern": "^(0|[1-9][0-9]*)$"
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
