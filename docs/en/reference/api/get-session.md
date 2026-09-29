# Read Session

```http
GET /api/v1/sessions/{sid}
```

Read Session

**operationId:** `get_session`

## Authentication

HTTPBearer / BrowserSession

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `sid` | path | Yes | string |  format: <code>"uuid"</code> |

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Successful Response | `application/json`: [Session](schema-session.md) |
| 400 | Bad Request | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 401 | Unauthorized | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 404 | Not Found | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 409 | Conflict | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 413 | Content Too Large | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 415 | Unsupported Media Type | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 422 | Unprocessable Content | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 503 | Service Unavailable | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
