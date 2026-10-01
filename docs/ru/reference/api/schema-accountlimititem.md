# AccountLimitItem



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `account_id` | Да | string |   |
| `profiles` | Да | array&lt;string&gt; |   |
| `state` | Да | string |  enum: <code>["unknown","unavailable","stale","fresh"]</code> |
| `observed_at` | Да | string / null |  format: <code>"date-time"</code> |
| `last_attempt_at` | Да | string / null |  format: <code>"date-time"</code> |
| `error_code` | Да | string / null |   |
| `buckets` | Да | array&lt;[AccountLimitBucket](schema-accountlimitbucket.md)&gt; |   |
| `reset_credits_available` | Да | integer / null | Количество накопленных сбросов лимита, доступных аккаунту. null означает отсутствие данных. Время наблюдения и состояние актуальности совпадают с окнами квот.  |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "account_id",
    "profiles",
    "state",
    "observed_at",
    "last_attempt_at",
    "error_code",
    "buckets",
    "reset_credits_available"
  ],
  "properties": {
    "account_id": {
      "type": "string"
    },
    "profiles": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "state": {
      "type": "string",
      "enum": [
        "unknown",
        "unavailable",
        "stale",
        "fresh"
      ]
    },
    "observed_at": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time"
    },
    "last_attempt_at": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time"
    },
    "error_code": {
      "anyOf": [
        {
          "type": "string",
          "enum": [
            "unsupported",
            "temporarily_unavailable",
            "invalid_response",
            "no_data",
            "authentication_unavailable"
          ],
          "x-enum-varnames": [
            "AccountLimitItemErrorCodeUnsupported",
            "AccountLimitItemErrorCodeTemporarilyUnavailable",
            "AccountLimitItemErrorCodeInvalidResponse",
            "AccountLimitItemErrorCodeNoData",
            "AccountLimitItemErrorCodeAuthenticationUnavailable"
          ]
        },
        {
          "type": "null"
        }
      ]
    },
    "buckets": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/AccountLimitBucket"
      }
    },
    "reset_credits_available": {
      "description": "Available earned rate-limit resets for the account; null when unknown. Uses the same observation time and freshness state as the quota windows.",
      "anyOf": [
        {
          "type": "integer",
          "format": "int64",
          "minimum": 0
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
