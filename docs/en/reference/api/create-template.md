# Register an own-project AgentBox template

```http
POST /api/v1/templates
```

Requires successful alias and tag lookups. Browser writes require the configured Origin and X-Orpheus-CSRF header set to 1. Active records become available to new sessions immediately, without restarting API or worker.

**operationId:** `create_template`

## Authentication

HTTPBearer / BrowserSession

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Request body

`application/json`: [CreateTemplate](schema-createtemplate.md)

```json
{
  "$ref": "#/components/schemas/CreateTemplate"
}
```

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 201 | Registered template | `application/json`: [Template](schema-template.md) |
| default | Invalid input (422), unauthorized (401), forbidden browser origin (403), missing record (404), duplicate (409), or unavailable provider/storage (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
