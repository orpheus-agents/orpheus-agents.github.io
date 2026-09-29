# Start Orpheus and the web interface

Download the example stack and create local configuration:

```sh
git clone https://github.com/orpheus-agents/orpheus-agents.github.io.git
cd orpheus-agents.github.io/examples/quickstart
python3 init.py
```

The script creates `.env`, [`orpheus.toml`](../configuration/profiles.md) and [`workflows/assistant.md`](../integrations/mattermost/workflow.md). It generates a database password, Orpheus API key and encryption key. Running it again does not overwrite files.

## Fill in the settings

1. Set [`AGENTBOX_API_KEY`](../reference/environment.md#env-agentbox-api-key), [`OPENAI_API_KEY`](../reference/environment.md#env-openai-api-key) and [`MATTERMOST_BOT_TOKEN`](../integrations/mattermost/connect.md) in `.env`.
2. Find [`mattermost.base_url`](../reference/mattermost.md#workflow-mattermost-base-url) in [`workflows/assistant.md`](../integrations/mattermost/workflow.md) and replace `https://chat.example.com` with your Mattermost server's HTTPS address. The connector uses this address to exchange messages. AgentBox sandboxes use it to download attachments and upload result files.

The model in [`orpheus.toml`](../configuration/profiles.md) is already set to `gpt-6-sol`. To use a different model, change [`model`](../reference/profiles.md#profile-model) in the `default` profile.

```sh
docker compose config --quiet
docker compose pull
docker compose up -d db migrate api worker web
curl -fsS http://localhost:9100/ready
```

Open `http://localhost:8085`. The session list stays empty until the first task.

Check the service status:

```sh
docker compose ps -a
```

The `-a` flag includes stopped containers so you can check the result of `migrate`. Compare the statuses with the table:

| Service | Expected result |
| --- | --- |
| `db`, `api` | Healthy |
| `migrate` | Exited with code 0 |
| `worker`, `web` | Running |

The API listens on port 8000. The web interface allows local read access. All published ports bind to `127.0.0.1`. For a remote server, use an SSH tunnel or configure [HTTPS and SSO](../operations/network.md).

Configuration: [compose.yaml](https://github.com/orpheus-agents/orpheus-agents.github.io/blob/main/examples/quickstart/compose.yaml).

Next: [start the connector](mattermost.md).
