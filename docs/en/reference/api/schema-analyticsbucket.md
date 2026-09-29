# AnalyticsBucket



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `from` | Yes | string |  format: <code>"date-time"</code> |
| `to` | Yes | string |  format: <code>"date-time"</code> |
| `runs_count` | Yes | integer |  format: <code>"int64"</code><br>minimum: <code>0</code><br>maximum: <code>9007199254740991</code> |
| `by_status` | Yes | [StatusCounts](schema-statuscounts.md) |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "from",
    "to",
    "runs_count",
    "by_status"
  ],
  "properties": {
    "from": {
      "type": "string",
      "format": "date-time"
    },
    "to": {
      "type": "string",
      "format": "date-time"
    },
    "runs_count": {
      "type": "integer",
      "format": "int64",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "by_status": {
      "$ref": "#/components/schemas/StatusCounts"
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
