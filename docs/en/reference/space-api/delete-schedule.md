# Soft delete a schedule

```http
DELETE /api/v1/schedules/{id}
```

Soft delete a schedule

**operationId:** `DeleteSchedule`

## Authentication

bearerAuth / browserSession / Public in anonymous mode

See [Space authentication](../../space/access.md) for access, browser writes and SAML callback rules.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `id` | path | Yes | string |  format: <code>"uuid"</code> |

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 204 | Success |  |
| default | Structured API error. 401 credentials, 403 CSRF, 404 missing, 409 conflict, 422 validation, 503 unavailable. | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
