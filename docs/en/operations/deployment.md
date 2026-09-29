# Deploy on a server

For one installation, use the [quick-start Compose stack](../getting-started/launch.md). It runs PostgreSQL, migrations, API, worker, Mattermost connector and web interface.

## Prepare the server

1. Install Docker Engine, Compose and Git.
2. Copy the example stack to a dedicated directory.
3. Initialize configuration and fill in credentials and Mattermost settings.
4. Check outbound access from the worker to AgentBox and from sandboxes to required systems.
5. Start the services and verify a first task.
6. Configure [HTTPS](network.md), [SSO](sso.md) and [backups](backup.md).

For initial inspection of a remote server, open an SSH tunnel:

```sh
ssh -L 8085:127.0.0.1:8085 user@your-server
```

Then open `http://localhost:8085` on your computer.

## Continuous operation

Enable Docker on boot. The stack uses `restart: unless-stopped` for long-running services. Migrations must finish successfully before API and worker start.

To use an external PostgreSQL instance, set [`DATABASE_URL`](../reference/environment.md#env-database-url) for API, worker and migrations. Keep profile TOML, encryption key and environment allowlist consistent across API and worker.

Run one Mattermost connector per server and bot identity. Preserve this rule, the separate migration step and SSE proxy settings when deploying to Kubernetes.
