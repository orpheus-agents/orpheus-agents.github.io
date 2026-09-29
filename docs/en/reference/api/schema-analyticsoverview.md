# AnalyticsOverview



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `as_of` | Yes | string |  format: <code>"date-time"</code> |
| `from` | Yes | string |  format: <code>"date-time"</code> |
| `to` | Yes | string |  format: <code>"date-time"</code> |
| `bucket` | Yes | string |  enum: <code>["hour","day"]</code> |
| `timezone` | Yes | string |   |
| `namespace` | Yes | string / null |   |
| `current` | Yes | object |  additionalProperties: <code>false</code> |
| `period` | Yes | object | Runs accepted during [from,to), including their latest recorded usage and full lifetime through as_of. additionalProperties: <code>false</code> |
| `series` | Yes | array&lt;[AnalyticsBucket](schema-analyticsbucket.md)&gt; |   |
| `namespaces` | Yes | array&lt;[AnalyticsNamespace](schema-analyticsnamespace.md)&gt; | The period's runs grouped by session namespace, most runs first; null is the group of sessions without a namespace. The groups add up to period.  |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "as_of",
    "from",
    "to",
    "bucket",
    "timezone",
    "namespace",
    "current",
    "period",
    "series",
    "namespaces"
  ],
  "properties": {
    "as_of": {
      "type": "string",
      "format": "date-time"
    },
    "from": {
      "type": "string",
      "format": "date-time"
    },
    "to": {
      "type": "string",
      "format": "date-time"
    },
    "bucket": {
      "type": "string",
      "enum": [
        "hour",
        "day"
      ]
    },
    "timezone": {
      "type": "string"
    },
    "namespace": {
      "type": [
        "string",
        "null"
      ]
    },
    "current": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "active_sessions"
      ],
      "properties": {
        "active_sessions": {
          "type": "integer",
          "format": "int64",
          "minimum": 0,
          "maximum": 9007199254740991
        }
      }
    },
    "period": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "runs_count",
        "by_status",
        "usage",
        "runtime_seconds"
      ],
      "description": "Runs accepted during [from,to), including their latest recorded usage and full lifetime through as_of.",
      "properties": {
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
    },
    "series": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/AnalyticsBucket"
      }
    },
    "namespaces": {
      "type": "array",
      "description": "The period's runs grouped by session namespace, most runs first; null is the group of sessions without a namespace. The groups add up to period.",
      "items": {
        "$ref": "#/components/schemas/AnalyticsNamespace"
      }
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
