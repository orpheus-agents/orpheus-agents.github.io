# List All Runs

```http
GET /api/v1/runs
```

List All Runs

**operationId:** `list_all_runs`

## Authentication

HTTPBearer / BrowserSession

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `namespace` | query | No | string | Exact match; 1–128 UTF-8 bytes, no NUL or whitespace-only value. minLength: <code>1</code><br>maxLength: <code>128</code> |
| `external_key` | query | No | string | Exact match; 1–512 UTF-8 bytes, no NUL or whitespace-only value. minLength: <code>1</code><br>maxLength: <code>512</code> |
| `input_fingerprint` | query | No | string | Exact match; 1–256 UTF-8 bytes, no NUL or whitespace-only value. minLength: <code>1</code><br>maxLength: <code>256</code> |
| `status` | query | No | [RunStatus](schema-runstatus.md) |   |
| `order` | query | No | string |  enum: <code>["asc","desc"]</code><br>default: <code>"asc"</code> |
| `limit` | query | No | integer |  default: <code>50</code><br>minimum: <code>1</code><br>maximum: <code>200</code> |
| `cursor` | query | No | string / null |   |

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Successful Response | `application/json`: [RunPage](schema-runpage.md) |
| 400 | Bad Request | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 401 | Unauthorized | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 404 | Not Found | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 409 | Conflict | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 413 | Content Too Large | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 415 | Unsupported Media Type | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 422 | Unprocessable Content | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 503 | Service Unavailable | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
