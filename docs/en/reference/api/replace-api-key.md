# Replace an account API key

```http
PUT /api/v1/llm-accounts/{id}/api-key
```

Replace an account API key

**operationId:** `replace_api_key`

## Authentication

HTTPBearer / BrowserSession

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `id` | path | Yes | string |  format: <code>"uuid"</code> |

## Request body

`application/json`: [ReplaceAPIKey](schema-replaceapikey.md)

```json
{
  "$ref": "#/components/schemas/ReplaceAPIKey"
}
```

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 204 | Replace an account API key |  |
| default | Invalid input (422), unauthorized (401), forbidden origin (403), missing record (404), conflict (409), or unavailable storage (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
