# Stream Events

```http
GET /api/v1/sessions/{sid}/events/stream
```

Stream Events

**operationId:** `stream_events`

## Authentication

HTTPBearer / BrowserSession

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `sid` | path | Yes | string |  format: <code>"uuid"</code> |
| `after` | query | No | string |  default: <code>"0"</code> |
| `last-event-id` | header | No | string / null |   |

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Successful Response | `text/event-stream`: string |
| 400 | Bad Request | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 401 | Unauthorized | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 404 | Not Found | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 409 | Conflict | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 413 | Content Too Large | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 415 | Unsupported Media Type | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 422 | Unprocessable Content | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 503 | Service Unavailable | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
