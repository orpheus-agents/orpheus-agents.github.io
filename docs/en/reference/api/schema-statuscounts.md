# StatusCounts



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `accepted` | Yes | integer |  format: <code>"int64"</code><br>minimum: <code>0</code><br>maximum: <code>9007199254740991</code> |
| `starting` | Yes | integer |  format: <code>"int64"</code><br>minimum: <code>0</code><br>maximum: <code>9007199254740991</code> |
| `running` | Yes | integer |  format: <code>"int64"</code><br>minimum: <code>0</code><br>maximum: <code>9007199254740991</code> |
| `cancelling` | Yes | integer |  format: <code>"int64"</code><br>minimum: <code>0</code><br>maximum: <code>9007199254740991</code> |
| `finalizing` | Yes | integer |  format: <code>"int64"</code><br>minimum: <code>0</code><br>maximum: <code>9007199254740991</code> |
| `completed` | Yes | integer |  format: <code>"int64"</code><br>minimum: <code>0</code><br>maximum: <code>9007199254740991</code> |
| `failed` | Yes | integer |  format: <code>"int64"</code><br>minimum: <code>0</code><br>maximum: <code>9007199254740991</code> |
| `cancelled` | Yes | integer |  format: <code>"int64"</code><br>minimum: <code>0</code><br>maximum: <code>9007199254740991</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "accepted",
    "starting",
    "running",
    "cancelling",
    "finalizing",
    "completed",
    "failed",
    "cancelled"
  ],
  "properties": {
    "accepted": {
      "type": "integer",
      "format": "int64",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "starting": {
      "type": "integer",
      "format": "int64",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "running": {
      "type": "integer",
      "format": "int64",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "cancelling": {
      "type": "integer",
      "format": "int64",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "finalizing": {
      "type": "integer",
      "format": "int64",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "completed": {
      "type": "integer",
      "format": "int64",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "failed": {
      "type": "integer",
      "format": "int64",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "cancelled": {
      "type": "integer",
      "format": "int64",
      "minimum": 0,
      "maximum": 9007199254740991
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
