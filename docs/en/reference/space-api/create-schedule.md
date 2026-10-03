# Create a schedule

```http
POST /api/v1/schedules
```

SAML non-admins can create only for their own email; an omitted owner is filled from the session. Explicit null or another owner returns 403 schedule_forbidden. Bearer, anonymous and admins have full access.

**operationId:** `CreateSchedule`

## Authentication

bearerAuth / browserSession / Public in anonymous mode

See [Space authentication](../../space/access.md) for access, browser writes and SAML callback rules.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `Idempotency-Key` | header | No | string | Retries with the same normalized body return the original response. Keys do not expire. format: <code>"uuid"</code> |

## Request body

`application/json`: [CreateSchedule](schema-createschedule.md)

```json
{
  "$ref": "#/components/schemas/CreateSchedule"
}
```

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 201 | Success | `application/json`: [Schedule](schema-schedule.md) |
| default | Structured API error. 401 credentials, 403 CSRF or schedule_forbidden, 404 missing, 409 conflict, 422 validation, 503 unavailable. | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
