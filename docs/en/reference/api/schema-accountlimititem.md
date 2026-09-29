# AccountLimitItem



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `account_id` | Yes | string |   |
| `profiles` | Yes | array&lt;string&gt; |   |
| `state` | Yes | string |  enum: <code>["unknown","unavailable","stale","fresh"]</code> |
| `observed_at` | Yes | string / null |  format: <code>"date-time"</code> |
| `last_attempt_at` | Yes | string / null |  format: <code>"date-time"</code> |
| `error_code` | Yes | string / null |   |
| `buckets` | Yes | array&lt;[AccountLimitBucket](schema-accountlimitbucket.md)&gt; |   |

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
    "buckets"
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
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
