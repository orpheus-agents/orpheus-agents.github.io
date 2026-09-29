# Revoke the local browser session

```http
POST /auth/logout
```

Requires the configured Origin and X-Orpheus-CSRF header equal to 1. Idempotent; clears the cookie. Does not terminate the IdP session.

**operationId:** `browser_logout`

## Authentication

No API key required.

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 204 | Revoke the local browser session |  |
| default | Invalid origin or CSRF header (403), or storage unavailable (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
