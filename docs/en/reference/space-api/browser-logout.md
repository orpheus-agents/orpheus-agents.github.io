# Revoke the local browser session

```http
POST /auth/logout
```

Requires the configured Origin and X-Orpheus-CSRF header equal to 1. Idempotent; clears the cookie. Does not terminate the IdP session.

**operationId:** `BrowserLogout`

## Authentication

No API key required.

See [Space authentication](../../space/access.md) for access, browser writes and SAML callback rules.

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 204 | Revoke the local browser session |  |
| default | Invalid origin or CSRF header (403), or storage unavailable (503). | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
