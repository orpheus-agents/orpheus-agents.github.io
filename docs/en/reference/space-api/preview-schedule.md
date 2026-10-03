# Preview five future cron occurrences

```http
POST /api/v1/schedules/preview
```

Preview five future cron occurrences

**operationId:** `PreviewSchedule`

## Authentication

bearerAuth / browserSession / Public in anonymous mode

See [Space authentication](../../space/access.md) for access, browser writes and SAML callback rules.

## Request body

`application/json`: [PreviewInput](schema-previewinput.md)

```json
{
  "$ref": "#/components/schemas/PreviewInput"
}
```

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Success | `application/json`: [Preview](schema-preview.md) |
| default | Structured API error. 401 credentials, 403 CSRF or schedule_forbidden, 404 missing, 409 conflict, 422 validation, 503 unavailable. | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
