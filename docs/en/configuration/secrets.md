# Access and secrets

## Configure services {#services}

A service defines the address and credentials that a client receives inside its sandbox. Configure the same catalog on API and worker in [`orpheus.toml`](profiles.md).

```toml
[services.helpdesk]
name = "Helpdesk"
description = "Read support tickets and publish replies."
delivery = "direct"
endpoint = "https://helpdesk.example.com"

[services.helpdesk.credentials]
key = { env = "SUPPORT_READ_TOKEN", as = "HELPDESK_TOKEN" }

[services.helpdesk.environment]
HELPDESK_URL = { from = "endpoint" }
```

Use a code matching `[a-z][a-z0-9_-]{0,63}`. Supply a name, description, `delivery = "direct"`, an HTTP(S) endpoint and at least one `environment` entry. Use `from = "endpoint"` for the full URL, `from = "endpoint.host"` for the host and optional port, or a string for an ordinary value. Each optional credential names a worker ENV source. Use `as` to give the variable a different name in the sandbox.

Set `SUPPORT_READ_TOKEN` on the **Orpheus worker**. The client receives its value in `HELPDESK_TOKEN` and the configured URL in `HELPDESK_URL`. Select the service in [`configuration.sandbox.services`](../reference/api/create-session.md) when creating a session:

```json
{
  "template": "codex",
  "services": ["helpdesk"]
}
```

This JSON is the value of [`configuration.sandbox`](../reference/api/create-session.md). The agent and session hooks receive the selected variables. Registering a service alone does not grant it to every session.

[`GET /api/v1/services`](../reference/api/get-services.md) returns codes, names, descriptions and client-facing `env_names`, sorted by code. Selection lists contain unique codes. An unknown code rejects the whole request with `422 unknown_service`.

[Mattermost workflows](../reference/mattermost.md#workflow-services) select codes through `services`. [GitLab review workflows](../reference/gitlab-review.md#workflow-services) also select services explicitly. In [Space](../space/schedules.md#environment), select services explicitly for each schedule. All catalog entries are available to users who can edit that schedule, including any service containing a Space API key. The external token keeps its own permissions.

## Individual variables {#individual-variables}

Use [`env_from`](../reference/api/create-session.md) to select an additional worker ENV by name. Permitted sources are the `credentials.*.env` names from all services and the entries in [`HARNESS_ENV_ALLOWLIST`](../reference/environment.md#env-harness-env-allowlist). Configure this list identically on API and worker.

When services or explicit settings in the same scope assign the same client variable, the worker combines equal values. Conflicting values prevent the process from starting. A run-scoped assignment overrides the session assignment for run hooks.

## Hook-only secrets {#hook-secrets}

Top-level [`services`, `env` and `env_from`](../reference/api/create-session.md) in session creation and [run creation](../reference/api/create-run.md) requests are available only to [`before_run`](hooks.md#hook-before-run) and [`after_run`](hooks.md#hook-after-run) for that run. They are not passed to the agent or `after_create`. For example, `"services": ["helpdesk"]` at the request's top level gives publication hooks helpdesk access. Do not write these secrets to agent-readable files or hook output.

This scope applies to the current request, not to the service globally. Catalog services can also be selected for agents in other sessions, including Space schedules. To keep a token out of service selectors, leave its name outside the catalog, permit it through [`HARNESS_ENV_ALLOWLIST`](../reference/environment.md#env-harness-env-allowlist), and pass it through top-level `env_from`. This does not restrict trusted API clients that can explicitly select permitted ENV names.

## Apply catalog changes {#changes}

Restart API and worker after changing the catalog. Sessions and runs store selected codes. Each new process receives values from the current catalog and worker environment. A running agent keeps its existing environment.

To start the agent with a new environment, create a new session. In Mattermost, increase the workflow's [`revision`](../integrations/mattermost/reload.md). In Space, [reset context](../space/schedules.md) for a schedule that reuses its session. Changing selected service codes also starts fresh context on the next eligible execution.

Explicit [`sandbox.env`](../reference/api/create-session.md) values are encrypted in the database with [`ENV_ENCRYPTION_KEY`](../reference/environment.md#env-env-encryption-key). Preserve this key across restarts and back it up separately from the database. Reserved system names, including [`OPENAI_API_KEY`](authentication.md#api-key), [`AGENTBOX_API_KEY`](../reference/environment.md#env-agentbox-api-key) and reserved [`ORPHEUS_*`](../reference/environment.md) names, cannot be arbitrary secrets.

[Publish through a hook](../integrations/custom/helpdesk-hook.md)
