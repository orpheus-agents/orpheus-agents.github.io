# Create Run

```http
POST /api/v1/sessions/{sid}/runs
```

Create a subsequent run. Sessions created with allow_multiple_runs=false reject this operation with 409 multiple_runs_not_allowed, regardless of the first run or sandbox state. Idempotent replay of an accepted request returns the original acceptance.

**operationId:** `create_run`

## Authentication

HTTPBearer

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `sid` | path | Yes | string |  format: <code>"uuid"</code> |
| `Idempotency-Key` | header | No | string / null |   |

## Request body

`application/json`: [CreateRun](schema-createrun.md)

```json
{
  "$ref": "#/components/schemas/CreateRun"
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
