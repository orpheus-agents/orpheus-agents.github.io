# AnalyticsOverview



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `as_of` | Да | string |  format: <code>"date-time"</code> |
| `from` | Да | string |  format: <code>"date-time"</code> |
| `to` | Да | string |  format: <code>"date-time"</code> |
| `bucket` | Да | string |  enum: <code>["hour","day"]</code> |
| `timezone` | Да | string |   |
| `namespace` | Да | string / null |   |
| `current` | Да | object |  additionalProperties: <code>false</code> |
| `period` | Да | object | Запуски, принятые в интервале [from,to), с последним сохранённым расходом и полной длительностью до as_of. additionalProperties: <code>false</code> |
| `series` | Да | array&lt;[AnalyticsBucket](schema-analyticsbucket.md)&gt; |   |
| `namespaces` | Да | array&lt;[AnalyticsNamespace](schema-analyticsnamespace.md)&gt; | Запуски периода по namespace сессии, начиная с наибольшего числа запусков. null объединяет сессии без namespace. Сумма групп совпадает с period.  |

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

[Все схемы](schemas.md) · [HTTP API](index.md)
