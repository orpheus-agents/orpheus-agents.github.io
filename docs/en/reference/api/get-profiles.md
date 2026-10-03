# List configured profiles

```http
GET /api/v1/profiles
```

Returns the complete catalog sorted by name from local configuration. No provider or credential lookups are performed.

**operationId:** `get_profiles`

## Authentication

HTTPBearer / BrowserSession

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Configured profiles | `application/json`: [Profiles](schema-profiles.md) |
| 401 | Unauthorized | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 503 | Authentication temporarily unavailable | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
