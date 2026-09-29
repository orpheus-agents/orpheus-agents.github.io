# Retries and recovery

A webhook can arrive twice. A session-creation response can be lost after Orpheus accepts the task. Treat these as ordinary operating conditions.

## Task admission

- Derive [`Idempotency-Key`](../../reference/api/conventions.md#requests) from a stable source event ID.
- After a timeout, retry the same body and key.
- Use a new key for a new event.
- On `409 idempotency_conflict`, investigate why the key was reused with different data.

[`external_key`](../../reference/api/create-session.md) and [`input_fingerprint`](../../reference/api/create-session.md) identify source objects and input versions. They do not deduplicate requests.

## Result delivery

Store `source_event_id → session_id → run_id` and publication status. Derive comment delivery keys from a run or hook operation. If the destination API does not support idempotency, check a stored comment ID or marker before resending.

Do not assume exactly-once delivery across independent systems without a supporting protocol. An uncertain delivery result requires reconciliation with the destination.

Retry [`503 capacity_exhausted`](../../configuration/limits.md) with backoff and jitter. Correct request data after `422`. On restart, restore unfinished work from stored identifiers and Orpheus state.

[HTTP API conventions](../../reference/api/conventions.md)
