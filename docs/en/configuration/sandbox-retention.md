# Paused sandbox retention

Reusable sessions keep their sandbox on pause between runs. Orpheus deletes old paused sandboxes to release their snapshots. Run history, messages, results and usage remain readable. Files, processes and agent context stored only inside a deleted sandbox cannot be recovered.

## Configure the worker

| Setting | Default | Accepted values |
| --- | --- | --- |
| [`SANDBOX_PAUSED_RETENTION_DAYS`](../reference/environment.md#env-sandbox-paused-retention-days) | 14 days | Integer from 1 to 100 inclusive |
| [`SANDBOX_CLEANUP_BATCH_SIZE`](../reference/environment.md#env-sandbox-cleanup-batch-size) | 1000 sessions per pass | Positive integer |

::: warning Choose retention before starting the worker
Cleanup starts with the worker and applies to existing paused sessions. Already expired sandboxes can enter its first batch. Deletion permanently removes files and agent context stored only in those sandboxes.
:::

Set these variables in the worker environment. With Compose, [recreate the worker container](../operations/maintenance.md) after changing them. A plain restart does not load changed ENV values. Invalid values prevent startup. Retention changes apply to existing paused sessions.

The period starts at the latest run's [`finished_at`](../reference/api/get-run.md), including failed and cancelled runs. A day is 24 hours. This measures time after run completion, not the exact duration of the physical pause. A subsequent finished run starts the period again. Reading history or replaying an accepted request does not extend it.

For example, with the default setting, a session becomes eligible after more than 14 days since its last run finished. Cleanup checks at worker startup and every four hours. It selects up to the batch limit, including retries, and deletes up to three sandboxes concurrently. A backlog or provider failure can delay deletion. Six four-hour passes select up to six times the batch size per day, including retries.

Active sessions are excluded. Cleanup does not consume execution slots or resume sandboxes. Failed deletions are retried in later passes, including after a worker restart.

## Continue after deletion

The [sandbox state](../reference/api/get-session.md) changes from `paused` through `deleting` to `deleted`. The sandbox error `sandbox_expired` explains the deletion. A failed deletion reports `sandbox_delete_failed` until a later attempt succeeds. The last run's result stays unchanged.

[Creating a run](../reference/api/create-run.md) in a `deleting`, `deleted` or `unavailable` reusable session returns `409 session_unavailable`. Create a new session with the context required for the new task. Orpheus does not recreate an environment inside the old session.

If a sandbox disappeared externally and Orpheus has not detected it yet, the API can return `202`. The run then fails with `sandbox_lost` when the worker confirms the loss. Do not automatically rerun a task that may already have performed actions. Replaying a previously accepted request with the same [idempotency key](../reference/api/conventions.md#requests) still returns its original acceptance.

[Mattermost continuation](../integrations/mattermost/conversation.md) and [Space context reset](../space/schedules.md#pausing-and-context) describe how each connector handles the next request. A session's [`allow_multiple_runs`](../reference/api/create-session.md) policy does not guarantee that its sandbox is still available.
