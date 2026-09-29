# Timeouts, concurrency and tokens

Limits control different resources. Match them to task duration and size.

| Setting | Controls | Default |
| --- | --- | --- |
| [`MAX_CONCURRENT_SESSIONS`](../reference/environment.md#env-max-concurrent-sessions) | Simultaneously occupied execution slots | 50 |
| [`run_timeout_seconds`](../reference/api/create-session.md) | Agent execution time per run | 3600 s |
| [`hooks.timeout_seconds`](../reference/api/create-session.md) | Each hook's execution time | 300 s |
| [`max_session_tokens`](../reference/api/create-session.md) | Input and output tokens across all session runs | 100,000,000 |

```json
{
  "run_timeout_seconds": 900,
  "max_session_tokens": 500000
}
```

This is the value of [`configuration.limits`](../reference/api/create-session.md). Mattermost exposes equivalent workflow fields. [`max_concurrent_runs`](../reference/mattermost.md#workflow-max-concurrent-runs) additionally limits a workflow's concurrent work.

When global capacity is exhausted, a new request receives `503 capacity_exhausted`. Retry later with the same idempotency key. Token budgets rely on agent usage reports and are not exact monetary caps. An exhausted session rejects new runs.

Orpheus renews sandbox activity time during execution. You do not need to manually add hook timeouts to the run timeout. Maximum uninterrupted sandbox lifetime is set by the [AgentBox plan](https://docs.agentbox.ru/en/billing/).

[Account limits](../web/limits.md) show provider quotas separately from these settings.
