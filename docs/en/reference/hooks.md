# Hooks and environment variables

Supply each hook as script text with a shebang in [`configuration.hooks`](api/create-session.md). The working directory is the session workspace. Choose an interpreter installed in the template.

| Variable | Availability | Purpose |
| --- | --- | --- |
| <span id="env-orpheus-session-id"></span>`ORPHEUS_SESSION_ID` | All executed hooks | Session UUID |
| <span id="env-orpheus-workspace-path"></span>`ORPHEUS_WORKSPACE_PATH` | All executed hooks | Absolute workspace path |
| <span id="env-orpheus-hook-operation-id"></span>`ORPHEUS_HOOK_OPERATION_ID` | All executed hooks | Stable hook operation ID |
| <span id="env-orpheus-run-id"></span>`ORPHEUS_RUN_ID` | [`before_run`](../configuration/hooks.md#hook-before-run), [`after_run`](../configuration/hooks.md#hook-after-run) | Run UUID |
| <span id="env-orpheus-input-fingerprint"></span>`ORPHEUS_INPUT_FINGERPRINT` | [`before_run`](../configuration/hooks.md#hook-before-run), [`after_run`](../configuration/hooks.md#hook-after-run), when supplied | Input snapshot version |
| <span id="env-orpheus-agent-status"></span>`ORPHEUS_AGENT_STATUS` | [`after_run`](../configuration/hooks.md#hook-after-run), when known | `completed`, `failed`, `cancelled` |
| <span id="env-orpheus-stop-reason"></span>`ORPHEUS_STOP_REASON` | [`after_run`](../configuration/hooks.md#hook-after-run), when known | Stop reason |

Run variables do not become agent environment variables. Pass necessary non-secret context through a prepared file or task text.

When names overlap, top-level run [`env`](api/create-run.md), [`env_from`](api/create-run.md) and [`services`](api/create-run.md) override session values for [`before_run`](../configuration/hooks.md#hook-before-run) and [`after_run`](../configuration/hooks.md#hook-after-run). They do not affect [`after_create`](../configuration/hooks.md#hook-after-create) or the agent process.

[`after_create`](../configuration/hooks.md#hook-after-create) runs after environment creation, [`before_run`](../configuration/hooks.md#hook-before-run) before an assignment and [`after_run`](../configuration/hooks.md#hook-after-run) after confirmed agent completion. [`before_remove`](api/create-session.md) is not executed.

A nonzero exit code or timeout is recorded as a hook error. The retained stdout/stderr limit does not stop the script. Give network calls a shorter timeout than the overall hook deadline.

[Practical guide](../configuration/hooks.md) · [Publish a reply](../integrations/custom/helpdesk-hook.md)
