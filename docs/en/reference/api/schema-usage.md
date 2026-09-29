# Usage

Last reported token consumption; missed reports are not reconstructed from history. Cached input and reasoning output are included in input and output respectively. The breakdown is recorded only since collection began; historical usage is not reconstructed.

**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `input_tokens` | Yes | integer |  format: <code>"int64"</code><br>minimum: <code>0</code> |
| `cached_input_tokens` | Yes | integer |  format: <code>"int64"</code><br>minimum: <code>0</code> |
| `output_tokens` | Yes | integer |  format: <code>"int64"</code><br>minimum: <code>0</code> |
| `reasoning_output_tokens` | Yes | integer |  format: <code>"int64"</code><br>minimum: <code>0</code> |
| `total_tokens` | Yes | integer |  format: <code>"int64"</code><br>minimum: <code>0</code> |

## JSON Schema

```json
{
  "type": "object",
  "description": "Last reported token consumption; missed reports are not reconstructed from history. Cached input and reasoning output are included in input and output respectively. The breakdown is recorded only since collection began; historical usage is not reconstructed.",
  "required": [
    "input_tokens",
    "cached_input_tokens",
    "output_tokens",
    "reasoning_output_tokens",
    "total_tokens"
  ],
  "properties": {
    "input_tokens": {
      "type": "integer",
      "format": "int64",
      "minimum": 0
    },
    "cached_input_tokens": {
      "type": "integer",
      "format": "int64",
      "minimum": 0
    },
    "output_tokens": {
      "type": "integer",
      "format": "int64",
      "minimum": 0
    },
    "reasoning_output_tokens": {
      "type": "integer",
      "format": "int64",
      "minimum": 0
    },
    "total_tokens": {
      "type": "integer",
      "format": "int64",
      "minimum": 0
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
