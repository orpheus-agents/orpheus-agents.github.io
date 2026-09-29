# Preparation and finalization hooks

Hooks execute repeatable actions inside the sandbox before or after the agent works. Supply executable script text with a shebang in [`configuration.hooks`](../reference/api/create-session.md).

| Hook | When it runs | Example |
| --- | --- | --- |
| <span id="hook-after-create"></span>`after_create` | After preparing the workspace | Create directories |
| <span id="hook-before-run"></span>`before_run` | Before every assignment | Download data and record the output path |
| <span id="hook-after-run"></span>`after_run` | After confirmed agent completion, before pause | Send a finished file |

```json
{
  "before_run": "#!/bin/sh\nset -eu\nmkdir -p replies\n",
  "timeout_seconds": 120
}
```

Check agent status before publishing. `after_run` can also follow an unsuccessful agent outcome. Use [`ORPHEUS_AGENT_STATUS`](../reference/hooks.md#env-orpheus-agent-status) and [`ORPHEUS_STOP_REASON`](../reference/hooks.md#env-orpheus-stop-reason). A hook does not replace external delivery tracking when the sandbox is lost or execution cannot be confirmed.

Use [`ORPHEUS_SESSION_ID`](../reference/hooks.md#env-orpheus-session-id), [`ORPHEUS_RUN_ID`](../reference/hooks.md#env-orpheus-run-id) and [`ORPHEUS_HOOK_OPERATION_ID`](../reference/hooks.md#env-orpheus-hook-operation-id) to associate results with work. A delivery retry must check whether the result was already published.

[`timeout_seconds`](../reference/api/create-session.md) limits each hook independently. Run details show hook output and errors. [`before_remove`](../reference/api/create-session.md) is not executed. Do not use it for cleanup.

[Hook reference](../reference/hooks.md) · [Helpdesk example](../integrations/custom/helpdesk-hook.md)
