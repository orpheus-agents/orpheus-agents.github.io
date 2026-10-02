# Consume a signed SAML HTTP-POST response

```http
POST /auth/callback
```

SAML mode only. Body is application/x-www-form-urlencoded with exactly one SAMLResponse and RelayState, at most 1 MiB. One-time request and browser nonce are required. Unsolicited responses are rejected.

**operationId:** `BrowserCallback`

## Authentication

No API key required.

See [Space authentication](../../space/access.md) for access, browser writes and SAML callback rules.

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 303 | Consume a signed SAML HTTP-POST response |  |
| default | Invalid login state (400), invalid SAML response (401), authentication disabled (404), oversized form (413), or authentication/storage unavailable (503). | `application/json`: [Problem](schema-problem.md) |

### Response headers 303

- `Location`: Validated local return path. string

[HTTP API](index.md)
