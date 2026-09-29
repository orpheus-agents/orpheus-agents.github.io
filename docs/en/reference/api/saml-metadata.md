# Read service provider metadata

```http
GET /saml/metadata
```

Read service provider metadata

**operationId:** `saml_metadata`

## Authentication

No API key required.

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Read service provider metadata | `application/samlmetadata+xml`: string |
| default | Authentication disabled (404), or metadata unavailable (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
