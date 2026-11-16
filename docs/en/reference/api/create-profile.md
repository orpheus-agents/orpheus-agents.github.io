# Create profile

```http
POST /api/v1/profiles
```

Create profile

**operationId:** `create_profile`

## Authentication

HTTPBearer / BrowserSession

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Request body

`application/json`: [CreateProfile](schema-createprofile.md)

```json
{
  "$ref": "#/components/schemas/CreateProfile"
}
```

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 201 | Create profile | `application/json`: [Profile](schema-profile.md) |
| default | Invalid input (422), unauthorized (401), forbidden origin (403), missing record (404), conflict (409), or unavailable storage (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
