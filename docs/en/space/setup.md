# Start Space

Executing schedules requires a [running Orpheus instance](../getting-started/launch.md), an agent profile and an AgentBox template. Space uses a separate PostgreSQL database. The example uses published API, worker and web images, so no image build is needed.

## Local interface

In your documentation repository clone:

```sh
cd examples/space
cp .env.example .env
```

Set `POSTGRES_PASSWORD` and `ORPHEUS_SPACE_API_KEY` in `.env` to different random values. Run `openssl rand -hex 32` for each. These Compose inputs populate the [database DSN](../reference/space.md#service) and [Space API keys](../reference/space.md#access).

```sh
docker compose config --quiet
docker compose pull
docker compose up -d db migrate api web
curl -fsS http://localhost:9110/ready
```

Open `http://localhost:8086`. The example uses [anonymous mode](access.md): the interface allows reading and writing without login, with ports bound to the local computer. Use `localhost` exactly because [`ORPHEUS_PUBLIC_URL`](../reference/space.md#access) must match the browser origin.

Without the worker you can create and edit a paused schedule and preview its next occurrences. No schedules execute.

## Connect Orpheus

If Orpheus runs on the same machine using the quick start, use the [local connection recipe](local-core.md). It uses a Docker network without exposing additional ports.

For another server, set [`ORPHEUS_BASE_URL` and `ORPHEUS_API_KEY`](../reference/space.md#core) in `.env`. The address must be reachable from Space containers, and the key must be in Orpheus’s [`PUBLIC_API_KEYS`](../reference/environment.md#env-public-api-keys).

Select an existing profile and AgentBox template in [`space.toml`](../reference/space.md#execution). The example uses `default` and `codex`. Then:

```sh
docker compose up -d api worker
docker compose ps
```

Wait for the worker to become `healthy`. This confirms process readiness, not connectivity to Orpheus. Verify connectivity with the [first schedule](first-task.md). An incorrect address leaves an occurrence in “Dispatching” with `core_unavailable`.

## Server deployment

Serve the web interface on a separate HTTPS domain and enable [SAML](access.md). Set [`ORPHEUS_SPACE_UPSTREAM`](../reference/space.md#web) to the internal Space API origin. The web image proxies `/api/`, `/auth/` and `/saml/` to Space. It does not send an API key to the browser.

API and worker share the same DSN and execution settings. Run one worker. Keep system port `9100` on the internal network. See [backups, probes and updates](operations.md).
