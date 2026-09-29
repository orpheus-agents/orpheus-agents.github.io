# Session and run states

| Run state | Meaning | Integration action |
| --- | --- | --- |
| `accepted` | Task accepted | Store identifiers and wait |
| `starting` | Environment preparation | Observe preparation and hooks |
| `running` | Agent executing | Clarifications can be sent |
| `cancelling` | Cancellation in progress | Wait for cancellation to finish |
| `finalizing` | Finalization and hooks | Wait for delivery outcome |
| `completed` | Run succeeded | Read the result |
| `failed` | Run failed | Inspect [`error`](api/get-run.md), phase and hooks |
| `cancelled` | Run cancelled | Check actions already performed |

[`active_run_id`](api/get-session.md) identifies unfinished work. [`last_run_id`](api/get-session.md) identifies the latest run. Check the specific run before publishing its result. Final text can appear before [`after_run`](../configuration/hooks.md#hook-after-run) finishes.

Sandbox state is separate: `not_created`, `provisioning`, `ready`, `pausing`, `paused`, `resuming`, `deleting`, `deleted`, `unavailable`. A retained sandbox ID does not guarantee accessibility.

Errors contain [`code`](api/schema-error.md), [`message`](api/schema-error.md), [`phase`](api/get-run.md) and [`details`](api/schema-error.md). Error phases are `preparation`, `execution`, `finalization` and `recovery`. Execution [`phase`](api/get-run.md) can identify [`after_create`](../configuration/hooks.md#hook-after-create), [`before_run`](../configuration/hooks.md#hook-before-run), `agent` or [`after_run`](../configuration/hooks.md#hook-after-run).

With [`allow_multiple_runs: false`](api/create-session.md), the sandbox is deleted after its only run completes, fails or is cancelled. Session history remains available. With `true`, the sandbox is paused, and the session can accept another run when context and budget remain available. If context is lost, create a new session with the necessary history from your system.
