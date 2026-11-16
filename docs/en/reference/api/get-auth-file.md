# Read the account authorization file

```http
GET /api/v1/llm-accounts/{id}/auth-file
```

Read the account authorization file

**operationId:** `get_auth_file`

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
| 200 | Read the account authorization file | `application/json`: [AuthFile](schema-authfile.md) |
| default | Invalid input (422), unauthorized (401), forbidden origin (403), missing record (404), conflict (409), or unavailable storage (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

### Response headers 200

- `ETag`:  string
- `Cache-Control`:  string

[HTTP API](index.md)
