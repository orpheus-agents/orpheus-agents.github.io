# Update profile

```http
PATCH /api/v1/profiles/{id}
```

Update profile

**operationId:** `update_profile`

## Authentication

HTTPBearer / BrowserSession

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `id` | path | Yes | string |  format: <code>"uuid"</code> |

## Request body

`application/json`: [UpdateProfile](schema-updateprofile.md)

```json
{
  "$ref": "#/components/schemas/UpdateProfile"
}
```

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Update profile | `application/json`: [Profile](schema-profile.md) |
| default | Invalid input (422), unauthorized (401), forbidden origin (403), missing record (404), conflict (409), or unavailable storage (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
