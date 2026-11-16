# Current provider limits by account

```http
GET /api/v1/accounts/limits
```

Read-only snapshot from worker observations. Does not contact the provider or refresh credentials. Responses use Cache-Control no-store.

**operationId:** `get_account_limits`

## Authentication

HTTPBearer / BrowserSession

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `account_ids` | query | No | array&lt;string&gt; | Comma-separated account UUIDs. Omit to read all account-file identities. minItems: <code>1</code><br>maxItems: <code>200</code> |

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Account limits snapshot | `application/json`: [AccountLimits](schema-accountlimits.md) |
| 401 | Unauthorized | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 503 | Account limits unavailable | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| default | Invalid input (422), unauthorized (401), forbidden origin (403), missing record (404), conflict (409), or unavailable storage (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
