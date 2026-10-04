# HTTP API

Generated from the Orpheus OpenAPI contract. Usage guidance is provided in the integration guides.

[Authentication, errors and retries](conventions.md) · [Integration example](../../integrations/custom/first-session.md) · [Data schemas](schemas.md)

[OpenAPI YAML](/openapi.yaml)

| Method | Path | Operation |
| --- | --- | --- |
| `GET` | `/api/v1/profiles` | [List configured profiles](get-profiles.md) |
| `GET` | `/api/v1/templates` | [List configured templates](get-templates.md) |
| `GET` | `/api/v1/services` | [List configured services](get-services.md) |
| `GET` | `/api/v1/accounts/limits` | [Current provider limits by configured account](get-account-limits.md) |
| `GET` | `/api/v1/analytics/overview` | [Dashboard analytics snapshot](get-analytics-overview.md) |
| `GET` | `/api/v1/auth/session` | [Read browser authentication state](auth-session.md) |
| `GET` | `/auth/login` | [Start SP-initiated SAML login](browser-login.md) |
| `POST` | `/auth/callback` | [Consume a signed SAML HTTP-POST response](browser-callback.md) |
| `POST` | `/auth/logout` | [Revoke the local browser session](browser-logout.md) |
| `GET` | `/saml/metadata` | [Read service provider metadata](saml-metadata.md) |
| `GET` | `/api/v1/runs` | [List All Runs](list-all-runs.md) |
| `GET` | `/api/v1/sessions` | [List Sessions](list-sessions.md) |
| `POST` | `/api/v1/sessions` | [Create Session](create-session.md) |
| `GET` | `/api/v1/sessions/{sid}` | [Read Session](get-session.md) |
| `GET` | `/api/v1/sessions/{sid}/events` | [Events](get-events.md) |
| `GET` | `/api/v1/sessions/{sid}/events/stream` | [Stream Events](stream-events.md) |
| `GET` | `/api/v1/sessions/{sid}/history` | [History](get-history.md) |
| `GET` | `/api/v1/sessions/{sid}/runs` | [List Runs](list-runs.md) |
| `POST` | `/api/v1/sessions/{sid}/runs` | [Create Run](create-run.md) |
| `GET` | `/api/v1/sessions/{sid}/runs/{rid}` | [Read Run](get-run.md) |
| `POST` | `/api/v1/sessions/{sid}/runs/{rid}/cancel` | [Cancel Run](cancel-run.md) |
| `POST` | `/api/v1/sessions/{sid}/runs/{rid}/messages` | [Send Message](send-message.md) |
