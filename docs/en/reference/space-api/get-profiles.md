# Get a page of Orpheus model profiles

```http
GET /api/v1/profiles
```

Returns active and inactive profiles. Use available=true for selection and an exact name without availability filters for a stored choice. Name filters are mutually exclusive; cursors are bound to the filters.

**operationId:** `GetProfiles`

## Authentication

bearerAuth / browserSession / Public in anonymous mode

See [Space authentication](../../space/access.md) for access, browser writes and SAML callback rules.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `active` | query | No | boolean |   |
| `available` | query | No | boolean |   |
| `name` | query | No | string | Exact case-sensitive profile name. minLength: <code>1</code> |
| `name_contains` | query | No | string | Literal case-insensitive substring of the name. minLength: <code>1</code> |
| `limit` | query | No | integer |  default: <code>50</code><br>minimum: <code>1</code><br>maximum: <code>200</code> |
| `cursor` | query | No | string |  minLength: <code>1</code><br>maxLength: <code>8192</code> |

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Success | `application/json`: [Profiles](schema-profiles.md) |
| default | Structured API error. 401 credentials, 403 CSRF or schedule_forbidden, 404 missing, 409 conflict, 422 validation, 503 unavailable. | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
