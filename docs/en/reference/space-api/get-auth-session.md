# Get browser access state

```http
GET /api/v1/auth/session
```

Get browser access state

**operationId:** `GetAuthSession`

## Authentication

No API key required.

See [Space authentication](../../space/access.md) for access, browser writes and SAML callback rules.

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Success | `application/json`: [AuthSession](schema-authsession.md) |
| default | Structured API error. 401 credentials, 403 CSRF, 404 missing, 409 conflict, 422 validation, 503 unavailable. | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
