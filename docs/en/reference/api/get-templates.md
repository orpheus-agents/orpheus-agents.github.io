# List registered templates

```http
GET /api/v1/templates
```

Database catalog ordered by (name, id). Filters are bound to opaque forward/backward cursors; no provider calls. New sessions require an exact active name from this catalog. Changes do not affect accepted sessions or idempotent replays.

**operationId:** `get_templates`

## Authentication

HTTPBearer / BrowserSession

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `active` | query | No | boolean |   |
| `name` | query | No | string | Exact case-sensitive reference. Incompatible with name_contains. minLength: <code>1</code> |
| `name_contains` | query | No | string | Literal case-insensitive substring of the reference. Incompatible with name. minLength: <code>1</code> |
| `limit` | query | No | integer |  default: <code>50</code><br>minimum: <code>1</code><br>maximum: <code>200</code> |
| `cursor` | query | No | string |  minLength: <code>1</code><br>maxLength: <code>8192</code> |

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | One page; cursor fields are null at the respective boundaries. | `application/json`: [Templates](schema-templates.md) |
| default | Invalid input (422), unauthorized (401), forbidden browser origin (403), missing record (404), duplicate (409), or unavailable provider/storage (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
