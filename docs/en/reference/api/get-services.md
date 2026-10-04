# List configured services

```http
GET /api/v1/services
```

Returns the complete catalog sorted by code from local configuration. No provider or credential lookups are performed.

**operationId:** `get_services`

## Authentication

HTTPBearer / BrowserSession

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Configured services | `application/json`: [Services](schema-services.md) |
| 401 | Unauthorized | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 503 | Authentication temporarily unavailable | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
