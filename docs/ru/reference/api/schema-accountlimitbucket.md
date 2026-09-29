# AccountLimitBucket



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `limit_id` | Да | string |   |
| `limit_name` | Да | string / null |   |
| `plan_type` | Да | string / null |   |
| `rate_limit_reached_type` | Да | string / null |   |
| `primary` | Да | [AccountLimitWindow](schema-accountlimitwindow.md) / null |   |
| `secondary` | Да | [AccountLimitWindow](schema-accountlimitwindow.md) / null |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "limit_id",
    "limit_name",
    "plan_type",
    "rate_limit_reached_type",
    "primary",
    "secondary"
  ],
  "properties": {
    "limit_id": {
      "type": "string"
    },
    "limit_name": {
      "type": [
        "string",
        "null"
      ]
    },
    "plan_type": {
      "type": [
        "string",
        "null"
      ]
    },
    "rate_limit_reached_type": {
      "type": [
        "string",
        "null"
      ]
    },
    "primary": {
      "anyOf": [
        {
          "$ref": "#/components/schemas/AccountLimitWindow"
        },
        {
          "type": "null"
        }
      ]
    },
    "secondary": {
      "anyOf": [
        {
          "$ref": "#/components/schemas/AccountLimitWindow"
        },
        {
          "type": "null"
        }
      ]
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
