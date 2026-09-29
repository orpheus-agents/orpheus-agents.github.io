# Troubleshooting

Start with `docker compose ps -a`, run details and the relevant service logs.

| Symptom | Check |
| --- | --- |
| Bot does not answer | Channel membership, mention, [`include_ids`](../reference/mattermost.md#workflow-include-ids), [`reconcile_from`](../reference/mattermost.md#workflow-reconcile-from), token |
| Workflow fails to load | [`validate`](../integrations/mattermost/reload.md), YAML, string [`revision`](../reference/mattermost.md#workflow-revision), overlapping routes |
| [`unknown_profile`](../configuration/profiles.md) | Profile name and matching API/worker configuration |
| [`validation_error`](../reference/api/schema-error.md) | [`error.details`](../reference/api/schema-error.md) for the invalid field path |
| [`capacity_exhausted`](../configuration/limits.md) | Active work and concurrency limit |
| Model authentication error | Worker credentials, profile mode and model access |
| File preparation error | Mattermost access from AgentBox, Python and file size |
| Answer arrives without file | Outbox instructions, [`after_run`](../configuration/hooks.md#hook-after-run) errors and file limits |
| Web reports no access | [`ORPHEUS_BROWSER_AUTH`](../reference/environment.md#env-orpheus-browser-auth), SSO and public origin |
| Updates arrive late | Reverse-proxy SSE buffering and connection state |
| SAML callback returns 401 | Signatures, ACS, time, AuthnStatement and metadata |
| Old model or tools used | Saved session configuration and workflow [`revision`](../reference/mattermost.md#workflow-revision) |

## Collect diagnostic context

Record the user action, time, [`session_id`](../reference/api/get-session.md), [`run_id`](../reference/api/get-run.md), error code and phase. Check whether a fresh test task reproduces the issue. Remove secrets and unnecessary user data before sharing logs.

Do not start by deleting the database or recreating every session. A publication failure does not mean the agent must repeat its work. First check whether the result already exists in the destination system.

[States and phases](../reference/states.md) · [API errors](../reference/api/conventions.md)
