# List llm-accounts

```http
GET /api/v1/llm-accounts
```

Database catalog ordered by (name, id), with filters bound to forward/backward cursors. Changes apply to new sessions; accepted sessions retain their account and execution snapshot.

**operationId:** `get_llm_accounts`

## Authentication

HTTPBearer / BrowserSession

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `active` | query | No | boolean |   |
| `name` | query | No | string | Exact case-sensitive name. Incompatible with name_contains. minLength: <code>1</code> |
| `name_contains` | query | No | string | Literal case-insensitive substring. Incompatible with name. minLength: <code>1</code> |
| `limit` | query | No | integer |  default: <code>50</code><br>minimum: <code>1</code><br>maximum: <code>200</code> |
| `cursor` | query | No | string |  minLength: <code>1</code><br>maxLength: <code>8192</code> |

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | List llm-accounts | `application/json`: [LLMAccounts](schema-llmaccounts.md) |
| default | Invalid input (422), unauthorized (401), forbidden origin (403), missing record (404), conflict (409), or unavailable storage (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
