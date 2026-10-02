# List schedules

```http
GET /api/v1/schedules
```

List schedules

**operationId:** `ListSchedules`

## Authentication

bearerAuth / browserSession / Public in anonymous mode

See [Space authentication](../../space/access.md) for access, browser writes and SAML callback rules.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `owner_email` | query | No | array&lt;string&gt; | Repeated email filter; OR semantics, at most 100 distinct normalized emails.  |
| `unowned` | query | No | boolean | Only schedules without an owner. Cannot be combined with owner_email.  |
| `status` | query | No | [Status](schema-status.md) |   |
| `limit` | query | No | integer |  default: <code>50</code><br>minimum: <code>1</code><br>maximum: <code>200</code> |
| `cursor` | query | No | string | Opaque position bound to normalized filters. New inserts are excluded from an ongoing traversal. minLength: <code>1</code><br>maxLength: <code>8192</code> |

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Success | `application/json`: [SchedulePage](schema-schedulepage.md) |
| default | Structured API error. 401 credentials, 403 CSRF, 404 missing, 409 conflict, 422 validation, 503 unavailable. | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
