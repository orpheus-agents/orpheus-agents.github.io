# Conditionally replace the account authorization file

```http
PUT /api/v1/llm-accounts/{id}/auth-file
```

Conditionally replace the account authorization file

**operationId:** `replace_auth_file`

## Authentication

HTTPBearer / BrowserSession

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `id` | path | Yes | string |  format: <code>"uuid"</code> |
| `If-Match` | header | Yes | string |  minLength: <code>1</code> |

## Request body

`application/json`: [AuthFile](schema-authfile.md)

```json
{
  "$ref": "#/components/schemas/AuthFile"
}
```

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 204 | Conditionally replace the account authorization file |  |
| default | Invalid input (422), unauthorized (401), forbidden origin (403), missing record (404), conflict (409), or unavailable storage (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

### Response headers 204

- `ETag`:  string

[HTTP API](index.md)
