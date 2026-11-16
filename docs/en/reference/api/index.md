# HTTP API

Generated from the Orpheus OpenAPI contract. Usage guidance is provided in the integration guides.

[Authentication, errors and retries](conventions.md) · [Integration example](../../integrations/custom/first-session.md) · [Data schemas](schemas.md)

[OpenAPI YAML](/openapi.yaml)

| Method | Path | Operation |
| --- | --- | --- |
| `GET` | `/api/v1/profiles` | [List profiles](get-profiles.md) |
| `POST` | `/api/v1/profiles` | [Create profile](create-profile.md) |
| `GET` | `/api/v1/profiles/{id}` | [Read profile](get-profile.md) |
| `PATCH` | `/api/v1/profiles/{id}` | [Update profile](update-profile.md) |
| `DELETE` | `/api/v1/profiles/{id}` | [Delete profile](delete-profile.md) |
| `GET` | `/api/v1/llm-accounts` | [List llm-accounts](get-llm-accounts.md) |
| `POST` | `/api/v1/llm-accounts` | [Create llm account](create-llm-account.md) |
| `GET` | `/api/v1/llm-accounts/{id}` | [Read llm account](get-llm-account.md) |
| `PATCH` | `/api/v1/llm-accounts/{id}` | [Update llm account](update-llm-account.md) |
| `DELETE` | `/api/v1/llm-accounts/{id}` | [Delete llm account](delete-llm-account.md) |
| `GET` | `/api/v1/credential-stores` | [List configured credential store names](get-credential-stores.md) |
| `PUT` | `/api/v1/llm-accounts/{id}/api-key` | [Replace an account API key](replace-api-key.md) |
| `GET` | `/api/v1/llm-accounts/{id}/auth-file` | [Read the account authorization file](get-auth-file.md) |
| `PUT` | `/api/v1/llm-accounts/{id}/auth-file` | [Conditionally replace the account authorization file](replace-auth-file.md) |
| `GET` | `/api/v1/templates` | [List registered templates](get-templates.md) |
| `POST` | `/api/v1/templates` | [Register an own-project AgentBox template](create-template.md) |
| `GET` | `/api/v1/templates/{id}` | [Read a registered template](get-template.md) |
| `PATCH` | `/api/v1/templates/{id}` | [Update template activity or description](update-template.md) |
| `DELETE` | `/api/v1/templates/{id}` | [Delete an Orpheus catalog record](delete-template.md) |
| `GET` | `/api/v1/services` | [List configured services](get-services.md) |
| `GET` | `/api/v1/accounts/limits` | [Current provider limits by account](get-account-limits.md) |
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
