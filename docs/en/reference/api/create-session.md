# Create Session

```http
POST /api/v1/sessions
```

Create Session

**operationId:** `create_session`

## Authentication

HTTPBearer

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `Idempotency-Key` | header | No | string / null |   |

## Request body

`application/json`: [CreateSession](schema-createsession.md)

```json
{
  "$ref": "#/components/schemas/CreateSession"
}
```

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 202 | Successful Response | `application/json`: [Accepted](schema-accepted.md) |
| 400 | Bad Request | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 401 | Unauthorized | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 403 | Browser sessions allow reading only (read_only_access). | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 404 | Not Found | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 409 | Conflict | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 413 | Content Too Large | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 415 | Unsupported Media Type | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 422 | Unprocessable Content | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 503 | Service Unavailable | `application/json`: [ErrorResponse](schema-errorresponse.md) |

### Response headers 202

- `Location`: URL of the accepted run. string

[HTTP API](index.md)
