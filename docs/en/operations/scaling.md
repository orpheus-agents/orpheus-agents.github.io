# Performance and concurrency

Start with limits matching available model and AgentBox quotas. More workers do not increase external service quotas.

| Setting | Scope |
| --- | --- |
| [`MAX_CONCURRENT_SESSIONS`](../reference/environment.md#env-max-concurrent-sessions) | Orpheus execution capacity |
| [`max_concurrent_runs`](../reference/mattermost.md#workflow-max-concurrent-runs) | Concurrent runs per Mattermost workflow |
| [`MAX_PARALLEL_THREADS`](../reference/mattermost.md#env-max-parallel-threads) | Connector thread-processing concurrency |
| [`message_batch_window`](../reference/mattermost.md#workflow-message-batch-window) | Group nearby messages before starting |

One session executes one run at a time. Independent sessions can run concurrently.

Multiple API and worker instances must share the database, profiles, allowlist and encryption key. Settings that affect admission must match. Do not configure different capacity limits across one installation.

Run one Mattermost connector per source: server and bot identity. Independent sources can use separate processes. Increasing replicas for the same source is not a scaling method.

When latency grows, inspect active work, account quotas, sandbox preparation errors and company API response times. Also monitor Mattermost history growth since [`reconcile_from`](../reference/mattermost.md#workflow-reconcile-from). Periodic reconciliation reads that range.
