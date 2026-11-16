# Read a registered template

```http
GET /api/v1/templates/{id}
```

Read a registered template

**operationId:** `get_template`

## Authentication

HTTPBearer / BrowserSession

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `id` | path | Yes | string |  format: <code>"uuid"</code> |

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Registered template, including inactive records | `application/json`: [Template](schema-template.md) |
| default | Invalid input (422), unauthorized (401), forbidden browser origin (403), missing record (404), duplicate (409), or unavailable provider/storage (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
