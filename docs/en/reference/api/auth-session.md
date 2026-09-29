# Read browser authentication state

```http
GET /api/v1/auth/session
```

Public browser state; Authorization is ignored. Invalid cookies are cleared. All responses use Cache-Control no-store.

**operationId:** `auth_session`

## Authentication

No API key required.

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Read browser authentication state | `application/json`: [BrowserAuthSession](schema-browserauthsession.md) |
| default | Storage unavailable (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
