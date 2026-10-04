# Access and secrets

## Configure services {#services}

A service groups the worker environment variables needed to access a system. Define the catalog in [`orpheus.toml`](profiles.md), with identical configuration on API and worker:

```toml
[services.helpdesk]
name = "Helpdesk"
description = "Read support tickets and publish replies."
env_from = ["HELPDESK_URL", "HELPDESK_TOKEN"]
```

The section key is the service code. It must match `[a-z][a-z0-9_-]{0,63}`. Name and description must be nonempty. Each service must list at least one valid, nonreserved ENV name without duplicates. Different services can share names. The catalog contains names, never credentials.

Supply `HELPDESK_URL` and `HELPDESK_TOKEN` values to the **Orpheus worker**. Select the service in [`configuration.sandbox.services`](../reference/api/create-session.md) when creating a session:

```json
{
  "template": "codex",
  "services": ["helpdesk"]
}
```

This JSON is the value of [`configuration.sandbox`](../reference/api/create-session.md). The agent and session hooks receive the selected variables. Registering a service alone does not grant it to every session.

[`GET /api/v1/services`](../reference/api/get-services.md) returns codes, names, descriptions and ENV names, sorted by code. Selection lists contain unique codes. An unknown code rejects the whole request with `422 unknown_service`.

[Mattermost workflows](../reference/mattermost.md#workflow-services) select codes through `services`. In [Space](../space/schedules.md#environment), select services explicitly for each schedule. All catalog entries are available to users who can edit that schedule, including any service containing a Space API key. The external token keeps its own permissions.

## Individual variables {#individual-variables}

You can combine services with [`env_from`](../reference/api/create-session.md). The effective set of permitted names is the union of [`HARNESS_ENV_ALLOWLIST`](../reference/environment.md#env-harness-env-allowlist) and every service's ENV list. Keep this configuration identical on API and worker. Add individual names outside the catalog to `HARNESS_ENV_ALLOWLIST`.

Selected service names and explicit `env_from` names are combined without duplicates. A literal [`env`](../reference/api/create-session.md) value cannot use the same name as a selected service variable in the same scope.

## Hook-only secrets {#hook-secrets}

Top-level [`services`, `env` and `env_from`](../reference/api/create-session.md) in session creation and [run creation](../reference/api/create-run.md) requests are available only to [`before_run`](hooks.md#hook-before-run) and [`after_run`](hooks.md#hook-after-run) for that run. They are not passed to the agent or `after_create`. For example, `"services": ["helpdesk"]` at the request's top level gives publication hooks helpdesk access. Do not write these secrets to agent-readable files or hook output.

This scope applies to the current request, not to the service globally. Catalog services can also be selected for agents in other sessions, including Space schedules. To keep a token out of service selectors, leave its name outside the catalog, permit it through [`HARNESS_ENV_ALLOWLIST`](../reference/environment.md#env-harness-env-allowlist), and pass it through top-level `env_from`. This does not restrict trusted API clients that can explicitly select permitted ENV names.

## Apply catalog changes {#changes}

Restart API and worker after editing the catalog. Accepted sessions and runs retain a snapshot of each selected service's name, description and ENV names. Their configuration does not change when the catalog changes. The worker resolves current values from its environment and checks the current permitted names when preparing execution.

To apply a changed service definition, create a new session. In Mattermost, increase the workflow's [`revision`](../integrations/mattermost/reload.md). In Space, [reset context](../space/schedules.md) for a schedule that reuses its session. Changing selected service codes also starts fresh context on the next eligible execution.

Explicit [`sandbox.env`](../reference/api/create-session.md) values are encrypted in the database with [`ENV_ENCRYPTION_KEY`](../reference/environment.md#env-env-encryption-key). Preserve this key across restarts and back it up separately from the database. Reserved system names, including [`OPENAI_API_KEY`](../reference/environment.md#env-openai-api-key), [`AGENTBOX_API_KEY`](../reference/environment.md#env-agentbox-api-key) and reserved [`ORPHEUS_*`](../reference/environment.md) names, cannot be arbitrary secrets.

[Publish through a hook](../integrations/custom/helpdesk-hook.md)
