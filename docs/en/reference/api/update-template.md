# Update template activity or description

```http
PATCH /api/v1/templates/{id}
```

Name and tag are immutable. Empty or whitespace-only descriptions become null. No AgentBox lookup. Browser writes require Origin and X-Orpheus-CSRF.

**operationId:** `update_template`

## Authentication

HTTPBearer / BrowserSession

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `id` | path | Yes | string |  format: <code>"uuid"</code> |

## Request body

`application/json`: [UpdateTemplate](schema-updatetemplate.md)

```json
{
  "$ref": "#/components/schemas/UpdateTemplate"
}
```

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Updated template | `application/json`: [Template](schema-template.md) |
| default | Invalid input (422), unauthorized (401), forbidden browser origin (403), missing record (404), duplicate (409), or unavailable provider/storage (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
