# Start SP-initiated SAML login

```http
GET /auth/login
```

SAML mode only; otherwise 404 auth_not_enabled. next must be a local absolute path (not auth routes); default /api/v1/auth/session. No Host or proxy header trust.

**operationId:** `browser_login`

## Authentication

No API key required.

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `next` | query | No | string |  maxLength: <code>2048</code> |

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 302 | Start SP-initiated SAML login |  |
| default | Invalid return path (400), authentication disabled (404), request validation failed (422), or authentication/storage unavailable (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

### Response headers 302

- `Location`: SAML IdP URL. string

[HTTP API](index.md)
