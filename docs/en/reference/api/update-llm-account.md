# Update llm account

```http
PATCH /api/v1/llm-accounts/{id}
```

Update llm account

**operationId:** `update_llm_account`

## Authentication

HTTPBearer / BrowserSession

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `id` | path | Yes | string |  format: <code>"uuid"</code> |

## Request body

`application/json`: [UpdateLLMAccount](schema-updatellmaccount.md)

```json
{
  "$ref": "#/components/schemas/UpdateLLMAccount"
}
```

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Update llm account | `application/json`: [LLMAccountDetails](schema-llmaccountdetails.md) |
| default | Invalid input (422), unauthorized (401), forbidden origin (403), missing record (404), conflict (409), or unavailable storage (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
