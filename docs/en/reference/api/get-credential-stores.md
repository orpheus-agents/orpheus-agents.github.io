# List configured credential store names

```http
GET /api/v1/credential-stores
```

List configured credential store names

**operationId:** `get_credential_stores`

## Authentication

HTTPBearer / BrowserSession

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | List configured credential store names | `application/json`: [CredentialStores](schema-credentialstores.md) |
| default | Invalid input (422), unauthorized (401), forbidden origin (403), missing record (404), conflict (409), or unavailable storage (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
