# Logs and readiness

Check API readiness, connector health and actual execution separately.

| Check | Quick-start address | Meaning |
| --- | --- | --- |
| API health | `http://localhost:9100/health` | Process responds |
| API ready | `http://localhost:9100/ready` | API can accept requests |
| Account metrics | `http://localhost:9100/metrics/service` | Latest stored quotas and available resets |
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

## Quotas and available resets

For accounts using [account authentication](../configuration/authentication.md#account), you can monitor remaining quota and the number of available earned rate-limit resets. These values are available through the [limits API](../reference/api/get-account-limits.md) and service metrics.

The [`reset_credits_available`](../reference/api/schema-accountlimititem.md) field contains the available reset count for the whole account: `0` means none are available, while `null` means the count is unknown. Resets belong to the account rather than an individual quota window and are separate from monetary credits. Orpheus reports their count without consuming them.

Data updates about once a minute while the account has an active Codex session. Reading the API or metrics does not refresh the observation or start a sandbox. A snapshot becomes `stale` after five minutes without an update, an unrecovered read failure or a passed window reset time. The last percentages and reset count remain available, but are no longer confirmed as current. [Limit states](../web/limits.md) distinguish fresh, stale and unknown data.

## Service metrics {#service-metrics}

`GET /metrics/service` serves Prometheus text or OpenMetrics on the [system port](../reference/environment.md#env-orpheus-system-port), which defaults to `9100`. It requires no authentication, so restrict access to a trusted network. The public API port does not serve metrics.

```sh
curl -fsS http://localhost:9100/metrics/service
```

All metrics are gauges and describe accounts across the installation. With multiple API replicas, collect them once through an internal Service rather than from every pod. In Kubernetes, use a ClusterIP and the `/metrics/service` path without exposing it through an Ingress or HTTPRoute.

| Metric | Labels | Value |
| --- | --- | --- |
| `orpheus_account_limit_remaining_percent` | `account_id`, `limit_id`, `window` | Last observed remaining quota percentage |
| `orpheus_account_limit_state` | `account_id`, `state` | Current state is 1, the other three are 0 |
| `orpheus_account_limit_observed_timestamp_seconds` | `account_id` | Unix timestamp of the last successful observation |
| `orpheus_account_limit_reset_timestamp_seconds` | `account_id`, `limit_id`, `window` | Unix timestamp of the next automatic window reset |
| `orpheus_account_reset_credits_available` | `account_id` | Last observed available reset count |

`window` is `primary` or `secondary`, and `state` is `fresh`, `stale`, `unknown` or `unavailable`. [`account_id`](../reference/profiles.md#profile-auth-account-id) groups profiles sharing an account. The provider defines window duration, so do not infer it from the name `primary` or `secondary`.

Unknown numbers and timestamps have no series, while a confirmed zero is reported as `0`. Stale values remain alongside the `stale` state and observation time. Removed accounts and windows disappear on the next successful scrape. Installations using only API keys return no account metric series.

If data is unavailable or the read exceeds three seconds, the endpoint returns HTTP 503. Monitor these failures with your usual `up` alert. A successful scrape confirms metrics availability, not the freshness of provider quotas.

### Low-quota alert

This example fires when any window has 7% or less remaining for two minutes and the account snapshot stays fresh. Replace `job="orpheus-service"` in both parts of the expression with the selector for your installation.

```yaml
alert: OrpheusAccountQuotaLow
expr: |
  (
    orpheus_account_limit_remaining_percent{job="orpheus-service"} <= 7
  )
  and on (account_id)
  (
    orpheus_account_limit_state{job="orpheus-service", state="fresh"} == 1
  )
for: 2m
labels:
  severity: warning
```

If one job collects multiple installations, restrict both parts to the target cluster and namespace labels or add the installation identity to `on (...)`.

Available resets do not suppress the alert. An alert disappearing when data becomes `stale` does not confirm quota recovery. Missing active sessions are not an incident on their own. Your monitoring team configures the rule and notification routing.

[Troubleshooting](troubleshooting.md)
