# Connect to local Orpheus

This connects the two prepared examples: [Orpheus quick start](../getting-started/launch.md) and [Space](setup.md). It uses Docker networking with the same commands on Linux and macOS. Published ports remain on `127.0.0.1`.

## Prepare the network and key

```sh
docker network create orpheus-space-core
openssl rand -hex 32
```

Save the generated key as `ORPHEUS_SPACE_CORE_API_KEY` in `examples/quickstart/.env`. It is an additional Orpheus key for Space. The original quick-start key will keep working.

Select the Compose override in the same file so subsequent commands preserve the network and both keys:

```dotenv
COMPOSE_FILE=compose.yaml:compose.space.yaml
```

In the same repository:

```sh
cd examples/quickstart
docker compose up -d --force-recreate api web
```

The override connects only the Orpheus API to the new network as `orpheus-core` and adds the key to [`PUBLIC_API_KEYS`](../reference/environment.md#env-public-api-keys).

## Connect Space

Set these values in `examples/space/.env`:

```dotenv
COMPOSE_FILE=compose.yaml:compose.core.yaml
ORPHEUS_BASE_URL=http://orpheus-core:8000
ORPHEUS_API_KEY=<ORPHEUS_SPACE_CORE_API_KEY value from quickstart/.env>
```

Keep [`ORPHEUS_SPACE_API_KEY`](../reference/space.md#cli) unchanged. It is a different key used to access Space itself.

```sh
cd ../space
docker compose up -d --force-recreate api web worker
docker compose ps
```

The shared network contains the Orpheus API, Space API and Space worker. Each web interface stays on its original network, so identical `api` service names do not interfere with proxying. The `orpheus-core` address identifies Orpheus unambiguously.

Compose reads `COMPOSE_FILE` from each example’s `.env`. Ordinary start and update commands preserve the connection. Wait for the Space worker to become `healthy`, then try the [first schedule](first-task.md). The Orpheus worker must also be running with access to AgentBox and the model.
