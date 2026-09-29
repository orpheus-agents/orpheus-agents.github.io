# StatusCounts



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `accepted` | Да | integer |  format: <code>"int64"</code><br>minimum: <code>0</code><br>maximum: <code>9007199254740991</code> |
| `starting` | Да | integer |  format: <code>"int64"</code><br>minimum: <code>0</code><br>maximum: <code>9007199254740991</code> |
| `running` | Да | integer |  format: <code>"int64"</code><br>minimum: <code>0</code><br>maximum: <code>9007199254740991</code> |
| `cancelling` | Да | integer |  format: <code>"int64"</code><br>minimum: <code>0</code><br>maximum: <code>9007199254740991</code> |
| `finalizing` | Да | integer |  format: <code>"int64"</code><br>minimum: <code>0</code><br>maximum: <code>9007199254740991</code> |
| `completed` | Да | integer |  format: <code>"int64"</code><br>minimum: <code>0</code><br>maximum: <code>9007199254740991</code> |
| `failed` | Да | integer |  format: <code>"int64"</code><br>minimum: <code>0</code><br>maximum: <code>9007199254740991</code> |
| `cancelled` | Да | integer |  format: <code>"int64"</code><br>minimum: <code>0</code><br>maximum: <code>9007199254740991</code> |

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

[Все схемы](schemas.md) · [HTTP API](index.md)
