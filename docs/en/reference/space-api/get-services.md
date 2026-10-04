# Get available Orpheus services

```http
GET /api/v1/services
```

All services are available to every caller with read access. Returns ENV names, never values.

**operationId:** `GetServices`

## Authentication

bearerAuth / browserSession / Public in anonymous mode

See [Space authentication](../../space/access.md) for access, browser writes and SAML callback rules.

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Success | `application/json`: [Services](schema-services.md) |
| default | Structured API error. 401 credentials, 403 CSRF or schedule_forbidden, 404 missing, 409 conflict, 422 validation, 503 unavailable. | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
