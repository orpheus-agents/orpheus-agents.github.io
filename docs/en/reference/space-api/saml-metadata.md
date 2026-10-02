# Read service provider metadata

```http
GET /saml/metadata
```

Read service provider metadata

**operationId:** `SamlMetadata`

## Authentication

No API key required.

See [Space authentication](../../space/access.md) for access, browser writes and SAML callback rules.

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Read service provider metadata | `application/samlmetadata+xml`: string |
| default | Authentication disabled (404), or metadata unavailable (503). | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
