# Logs and readiness

Check API readiness, connector health and actual execution separately.

| Check | Quick-start address | Meaning |
| --- | --- | --- |
| API health | `http://localhost:9100/health` | Process responds |
| API ready | `http://localhost:9100/ready` | API can accept requests |
| Mattermost ready | `http://localhost:8081/readyz` | Latest connector reconciliation state |
| Mattermost metrics | `http://localhost:8081/metrics` | Processing, errors and lag |

The worker has no HTTP healthcheck. Inspect its process, logs and task progress.

```sh
docker compose logs --since=10m api worker mattermost
curl -fsS http://localhost:9100/ready
curl -fsS http://localhost:8081/readyz
```

Record [`session_id`](../reference/api/get-session.md) and [`run_id`](../reference/api/get-run.md) when investigating a problem. Match them to web detail pages and service logs.

Connector metrics include active work, errors, reconnects, processing lag and pending-result age. Alert on sustained errors and growing delays rather than a single network interruption.

A healthy process does not confirm model access. Verify that separately with a controlled test task, accounting for external service usage.

[Troubleshooting](troubleshooting.md)
