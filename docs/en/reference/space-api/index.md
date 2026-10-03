# Space HTTP API

Generated from the Orpheus Space OpenAPI contract. Usage guidance is provided in the integration guides.

[API conventions](conventions.md) · [Schedules](../../space/schedules.md) · [Data schemas](schemas.md)

[OpenAPI YAML](/space.openapi.yaml)

| Method | Path | Operation |
| --- | --- | --- |
| `GET` | `/api/v1/schedules` | [List schedules](list-schedules.md) |
| `POST` | `/api/v1/schedules` | [Create a schedule](create-schedule.md) |
| `GET` | `/api/v1/schedules/{id}` | [Get a schedule including deleted records](get-schedule.md) |
| `PATCH` | `/api/v1/schedules/{id}` | [Update selected schedule fields](update-schedule.md) |
| `DELETE` | `/api/v1/schedules/{id}` | [Soft delete a schedule](delete-schedule.md) |
| `GET` | `/api/v1/schedules/profiles` | [Get Orpheus profiles and the creation default](get-profiles.md) |
| `GET` | `/api/v1/schedules/templates` | [Get Orpheus templates and the creation default](get-templates.md) |
| `GET` | `/api/v1/schedules/settings` | [Get allowed environment names](get-settings.md) |
| `POST` | `/api/v1/schedules/preview` | [Preview five future cron occurrences](preview-schedule.md) |
| `GET` | `/api/v1/auth/session` | [Get browser access state](get-auth-session.md) |
| `GET` | `/api/v1/schedules/{id}/occurrences` | [Read stored history without calling the core](list-occurrences.md) |
| `GET` | `/api/v1/schedules/{id}/occurrences/{occurrence_id}` | [Read a stored occurrence without calling the core](get-occurrence.md) |
| `GET` | `/api/v1/schedules/{id}/occurrences/{occurrence_id}/result` | [Explicitly fetch the current result from the Orpheus core](get-occurrence-result.md) |
| `POST` | `/api/v1/schedules/{id}/reset-session` | [Detach the reusable session for the next occurrence](reset-session.md) |
| `GET` | `/auth/login` | [Start SP-initiated SAML login](browser-login.md) |
| `POST` | `/auth/callback` | [Consume a signed SAML HTTP-POST response](browser-callback.md) |
| `POST` | `/auth/logout` | [Revoke the local browser session](browser-logout.md) |
| `GET` | `/saml/metadata` | [Read service provider metadata](saml-metadata.md) |
