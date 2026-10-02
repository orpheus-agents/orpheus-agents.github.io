# Operate Space

## Processes and probes

The Space image runs `serve`, `worker` and `migrate up`. Scale API replicas independently. Run one worker: a second process exits if another worker already owns execution. In Kubernetes use one worker replica with the `Recreate` strategy.

API and worker have separate system HTTP listeners, defaulting to port [`9100`](../reference/space.md#service):

| Probe | Purpose |
| --- | --- |
| `/health` | The process responds |
| `/ready` | Process and database readiness with migrations applied |

Keep probes on the internal network. Do not expose the system port with the public API. Readiness alone does not confirm Orpheus or model-provider availability.

Run commands from the Space example directory. For a [local connection](local-core.md), keep `COMPOSE_FILE` in `.env`:

```sh
docker compose ps
docker compose logs --tail=100 api worker migrate
curl -fsS http://localhost:9110/ready
```

## Data and updates

Back up the Space database separately from Orpheus. Space stores schedules, occurrence history and browser sessions. Orpheus stores messages and full results. Preserve configuration, the SAML pair and API keys in your secret store as well.

To update the example, stop the worker, change image versions in `.env`, run migrations and start the processes:

```sh
docker compose stop worker
docker compose --profile execution pull
docker compose run --rm migrate
docker compose up -d api web worker
```

Take a backup before updating. Afterwards, check readiness, login and an upcoming occurrence. Following downtime, only the latest due occurrence is considered. See [schedule behavior](schedules.md).

## Diagnostics {#diagnostics}

Distinguish submission [`state`](../reference/space-api/schema-occurrencestate.md) from Orpheus execution [`run_status`](../reference/space-api/schema-occurrence.md).

| Submission state | Meaning |
| --- | --- |
| `pending` | Waiting for submission |
| `dispatching` | Submitting or reconciling the request outcome |
| `accepted` | Orpheus accepted the run. See `run_status` for its outcome |
| `skipped` | Occurrence skipped |
| `failed` | Submission failed |
| `cancelled` | Pending work cancelled |

In the occurrence card, [`observed_at`](../reference/space-api/schema-occurrence.md) is the last successful observation of Orpheus state. `sync_error_code` records a subsequent synchronization error, preserving the earlier status. `run_error_code` relates to agent execution, while `error_code` relates to submission.

| Symptom | Action |
| --- | --- |
| `dispatching` with `core_unavailable` | Check the Orpheus address and connectivity from Space. Its worker can still be `healthy` |
| No new occurrences | Check schedule status, time zone, worker readiness and Orpheus connectivity |
| `run_not_found` / `session_not_found` | Check the Orpheus address and restore access to the original run. A missing record does not prove completion, so further execution remains blocked |
| Result returns `503` | Check the [Orpheus URL and key](../reference/space.md#core) on Space API. Stored history remains available |
| Saving returns `403` | Match the browser origin to the [public URL](../reference/space.md#access) and ensure the proxy passes the CSRF header |
| Saving ENV returns `422` | The name is not permitted by Space. Select an available name or update the Space allowlist |
| Submission is `failed` with `validation_error` | Orpheus rejected the request. For an ENV rejection, allow the name on Orpheus API/worker |
| Run accepted, then failed due to ENV | Supply the variable value to the Orpheus worker and inspect the run error |
| Context reset returns `409` | Wait for the active run to finish or its synchronization to recover |

## If the run record is lost

Check that Space points to the original Orpheus instance. Restore the record with the Orpheus database backup. Once Space observes a terminal status, planning resumes.

If recovery is impossible, check the submission state:

- **`accepted`**: Orpheus already accepted the run, and Space will not resubmit it. Confirm that the original work is neither running nor able to resume. Then delete the schedule and create a new one. The old history remains. Space may keep trying to read the lost run, but these attempts do not block the new schedule.
- **`dispatching`**: the submission outcome is unknown. Deleting the schedule does not stop submission attempts. Restore connectivity to the original Orpheus instance and establish the request outcome first. Do not create a replacement before then, to avoid duplicate execution.

[Result retrieval](../reference/space-api/get-occurrence-result.md) does not overwrite stored history. See [fields and error codes](../reference/space-api/conventions.md#history).
