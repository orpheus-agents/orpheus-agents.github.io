# Run a schedule now without changing its timing or activity

```http
POST /api/v1/schedules/{id}/run
```

Requires permission to edit the schedule. Active and paused schedules can run manually. Returns 409 schedule_busy while an occurrence is unfinished, including an unknown dispatch outcome. A repeated key for this schedule returns the same occurrence with its current state, even after completion or deletion, subject to current permissions. The worker prepares the saved settings through the usual execution path. Acceptance does not mean the agent has started.

**operationId:** `RunSchedule`

## Authentication

bearerAuth / browserSession / Public in anonymous mode

See [Space authentication](../../space/access.md) for access, browser writes and SAML callback rules.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `id` | path | Yes | string |  format: <code>"uuid"</code> |
| `Idempotency-Key` | header | Yes | string | Nonzero UUID identifying this manual command within the schedule. Retrying the same key never creates another occurrence. Keys do not expire. format: <code>"uuid"</code> |

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 202 | The command was stored, or the same command was already accepted. | `application/json`: [Occurrence](schema-occurrence.md) |
| default | Structured API error. 401 credentials, 403 CSRF or schedule_forbidden, 404 missing, 409 conflict, 422 validation, 503 unavailable. | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
