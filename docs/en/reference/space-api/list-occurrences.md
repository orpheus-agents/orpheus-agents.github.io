# Read stored history without calling the core

```http
GET /api/v1/schedules/{id}/occurrences
```

Read stored history without calling the core

**operationId:** `ListOccurrences`

## Authentication

bearerAuth / browserSession / Public in anonymous mode

See [Space authentication](../../space/access.md) for access, browser writes and SAML callback rules.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `id` | path | Yes | string |  format: <code>"uuid"</code> |
| `limit` | query | No | integer |  default: <code>50</code><br>minimum: <code>1</code><br>maximum: <code>200</code> |
| `cursor` | query | No | string | Opaque position bound to normalized filters. New inserts are excluded from an ongoing traversal. minLength: <code>1</code><br>maxLength: <code>8192</code> |

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Success | `application/json`: [OccurrencePage](schema-occurrencepage.md) |
| default | Structured API error. 401 credentials, 403 CSRF, 404 missing, 409 conflict, 422 validation, 503 unavailable. | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
