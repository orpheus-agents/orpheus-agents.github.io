# AnalyticsNamespace

Запуски интервала [from,to) с указанным namespace. Определения показателей совпадают с period.

**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `namespace` | Да | string / null |   |
| `runs_count` | Да | integer |  format: <code>"int64"</code><br>minimum: <code>0</code><br>maximum: <code>9007199254740991</code> |
| `by_status` | Да | [StatusCounts](schema-statuscounts.md) |   |
| `usage` | Да | [AggregateUsage](schema-aggregateusage.md) |   |
| `runtime_seconds` | Да | number |  format: <code>"double"</code><br>minimum: <code>0</code> |

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

[Все схемы](schemas.md) · [HTTP API](index.md)
