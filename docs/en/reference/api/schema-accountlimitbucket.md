# AccountLimitBucket



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `limit_id` | Yes | string |   |
| `limit_name` | Yes | string / null |   |
| `plan_type` | Yes | string / null |   |
| `rate_limit_reached_type` | Yes | string / null |   |
| `primary` | Yes | [AccountLimitWindow](schema-accountlimitwindow.md) / null |   |
| `secondary` | Yes | [AccountLimitWindow](schema-accountlimitwindow.md) / null |   |

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

[All schemas](schemas.md) · [HTTP API](index.md)
