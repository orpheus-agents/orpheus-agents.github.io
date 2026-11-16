# Create llm account

```http
POST /api/v1/llm-accounts
```

Create llm account

**operationId:** `create_llm_account`

## Authentication

HTTPBearer / BrowserSession

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Request body

`application/json`: [CreateLLMAccount](schema-createllmaccount.md)

```json
{
  "$ref": "#/components/schemas/CreateLLMAccount"
}
```

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 201 | Create llm account | `application/json`: [LLMAccountDetails](schema-llmaccountdetails.md) |
| default | Invalid input (422), unauthorized (401), forbidden origin (403), missing record (404), conflict (409), or unavailable storage (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
