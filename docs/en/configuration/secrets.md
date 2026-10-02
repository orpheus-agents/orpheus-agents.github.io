# Access and secrets

To give an agent a company API token, configure three places:

1. Allow its variable name in [`HARNESS_ENV_ALLOWLIST`](../reference/environment.md#env-harness-env-allowlist) on both API and worker.
2. Supply the value to the worker process.
3. Select it in [`configuration.sandbox.env_from`](../reference/api/create-session.md) when creating a session through the API, or in [`env_from`](../reference/mattermost.md#workflow-env-from) in a [Mattermost workflow](../integrations/mattermost/workflow.md).

```yaml
# Environment of API and worker
HARNESS_ENV_ALLOWLIST: '["MATTERMOST_BOT_TOKEN", "HELPDESK_TOKEN"]'
# Worker only
HELPDESK_TOKEN: ${HELPDESK_TOKEN}
```

```json
{
  "template": "codex",
  "env_from": ["HELPDESK_TOKEN"]
}
```

The JSON is the value of [`configuration.sandbox`](../reference/api/create-session.md). Allowlisting a name does not pass it to every session.

In [Space](../space/schedules.md#environment), users select additional ENV names per schedule. Allow these on Space API/worker as well. Values still belong on the Orpheus worker.

## Hook-only secrets {#hook-secrets}

Top-level [`env`](../reference/api/create-session.md) and [`env_from`](../reference/api/create-session.md) in session creation and [run creation](../reference/api/create-run.md) requests are available only to [`before_run`](hooks.md#hook-before-run) and [`after_run`](hooks.md#hook-after-run). They are not passed to the agent. Use these fields for a publication script's token. Do not write the token to agent-readable files or hook output.

Explicit [`sandbox.env`](../reference/api/create-session.md) values are encrypted in the database with [`ENV_ENCRYPTION_KEY`](../reference/environment.md#env-env-encryption-key). Preserve this key across restarts and back it up separately from the database. Reserved system names, including [`OPENAI_API_KEY`](../reference/environment.md#env-openai-api-key), [`AGENTBOX_API_KEY`](../reference/environment.md#env-agentbox-api-key) and reserved [`ORPHEUS_*`](../reference/environment.md) names, cannot be arbitrary secrets.

[Publish through a hook](../integrations/custom/helpdesk-hook.md)
