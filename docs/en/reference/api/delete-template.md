# Delete an Orpheus catalog record

```http
DELETE /api/v1/templates/{id}
```

Does not modify AgentBox or accepted sessions. Browser writes require Origin and X-Orpheus-CSRF.

**operationId:** `delete_template`

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
| 204 | Deleted |  |
| default | Invalid input (422), unauthorized (401), forbidden browser origin (403), missing record (404), duplicate (409), or unavailable provider/storage (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
