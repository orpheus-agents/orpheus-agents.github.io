# AnalyticsNamespace

Runs accepted during [from,to) whose session has this namespace, with the same definitions as period.

**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `namespace` | Yes | string / null |   |
| `runs_count` | Yes | integer |  format: <code>"int64"</code><br>minimum: <code>0</code><br>maximum: <code>9007199254740991</code> |
| `by_status` | Yes | [StatusCounts](schema-statuscounts.md) |   |
| `usage` | Yes | [AggregateUsage](schema-aggregateusage.md) |   |
| `runtime_seconds` | Yes | number |  format: <code>"double"</code><br>minimum: <code>0</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "namespace",
    "runs_count",
    "by_status",
    "usage",
    "runtime_seconds"
  ],
  "description": "Runs accepted during [from,to) whose session has this namespace, with the same definitions as period.",
  "properties": {
    "namespace": {
      "type": [
        "string",
        "null"
      ]
    },
    "runs_count": {
      "type": "integer",
      "format": "int64",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "by_status": {
      "$ref": "#/components/schemas/StatusCounts"
    },
    "usage": {
      "$ref": "#/components/schemas/AggregateUsage"
    },
    "runtime_seconds": {
      "type": "number",
      "format": "double",
      "minimum": 0
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
