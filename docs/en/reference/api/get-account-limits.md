# Current provider limits by configured account

```http
GET /api/v1/accounts/limits
```

Read-only snapshot from worker observations. Does not contact the provider or refresh credentials. Responses use Cache-Control no-store.

**operationId:** `get_account_limits`

## Authentication

HTTPBearer / BrowserSession

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Account limits snapshot | `application/json`: [AccountLimits](schema-accountlimits.md) |
| 401 | Unauthorized | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 503 | Account limits unavailable | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
