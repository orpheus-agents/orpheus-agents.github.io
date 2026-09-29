# Continue work and send clarifications

Store the association between the ticket and [`session_id`](../../reference/api/get-session.md). When a new event arrives, first check whether the previous run has finished.

Subsequent runs require a session created with [`allow_multiple_runs: true`](../../reference/api/create-session.md). In the default mode, create a new session for the next task. Clarifications to a working agent are available in either mode.

## Check the state

Call [get session](../../reference/api/get-session.md), replacing `{sid}` with its ID:

```http
GET /api/v1/sessions/{sid}
```

The response's [`active_run_id`](../../reference/api/get-session.md) contains the unfinished run's ID, or `null` if none exists. [`status`](../../reference/api/get-session.md) and [`phase`](../../reference/api/get-session.md) describe the latest run. For example, this response fragment means the agent is working:

```json
{
  "allow_multiple_runs": true,
  "active_run_id": "8a61a76c-73bf-4cbd-a501-26d2f5fcb7a1",
  "status": "running",
  "phase": "agent"
}
```

Choose an action based on the state:

| [`status`](../../reference/api/schema-runstatus.md) | What is happening | Connector action |
| --- | --- | --- |
| `accepted`, `starting` | The task is accepted, and the environment and hooks are being prepared for the agent | Retain the new message and check the state again in a few seconds |
| `running` | The agent is working | Send a [clarification](#clarification-during-execution), replacing `{rid}` with the active run's ID |
| `cancelling`, `finalizing` | The run is stopping or finishing, including the hook after the agent | Retain the message and wait for the run to finish |
| `completed`, `failed`, `cancelled` | The run has finished, and there is no active run | [Create another run](#another-assignment) if multiple runs are allowed, otherwise create a new session. If there was an error, check its cause first |

A [`final_message`](../../reference/api/get-session.md) does not mean the run has finished: the agent's answer may be ready while [`after_run`](../../configuration/hooks.md#hook-after-run) is still executing. Use the run's state to decide.

For details of a specific run, call [get run](../../reference/api/get-run.md). Use [`active_run_id`](../../reference/api/get-session.md), or [`last_run_id`](../../reference/api/get-session.md) if the run has finished.

## Another assignment

Send [POST create run](../../reference/api/create-run.md) to [`/api/v1/sessions/{sid}/runs`](../../reference/api/create-run.md):

<<< @/../examples/create-run.json

## Clarification during execution

Send a [run message](../../reference/api/send-message.md) to [`/api/v1/sessions/{sid}/runs/{rid}/messages`](../../reference/api/send-message.md):

<<< @/../examples/send-message.json

A session executes one run at a time. A clarification does not create a parallel task.

## If a request is rejected

State can change between checking and sending a message. Read [`error.code`](../../reference/api/conventions.md#errors) in the API response:

- `409 session_busy`: an unfinished run already exists. Read the session again and choose an action from the table.
- `409 multiple_runs_not_allowed`: the session allows only one run. Create a new session with the necessary context.
- `409 run_not_accepting_messages`: the run is not accepting clarifications. Retain the message, read the session again and wait for a suitable state, or create another run if the previous one has finished.
- `409 session_unavailable` or `409 token_limit_exceeded`: the environment is unavailable or the session's token budget is exhausted. Create a new session with the necessary context. Do the same if a finished run reports lost context through [`error.code: context_lost`](../../reference/api/get-run.md).

Give each operation its own [`Idempotency-Key`](../../reference/api/conventions.md#requests), stable across retries. After a network timeout, repeat the same request with the same body and key to determine whether it was accepted. See [retries and recovery](reliability.md).

## Stopping a run

To stop execution, call [cancel run](../../reference/api/cancel-run.md). Cancellation does not roll back changes already made in an external system.
