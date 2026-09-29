# Prepare your environment

The quick start ends with a bot answering in Mattermost and its work visible in the Orpheus web interface.

## Install the tools

On a computer or Linux server, install [Docker with Compose](https://docs.docker.com/engine/install/), Git and Python 3. Check:

```sh
docker version
docker compose version
git --version
python3 --version
```

Docker must be running. Use Docker Desktop on a workstation or Docker Engine with the Compose plugin on a server. Use Compose 2.24 or newer.

## Prepare the services

1. Create an AgentBox project and obtain an [API key](https://docs.agentbox.ru/en/quickstart/api-key/). The example uses the ready-made [`codex`](https://docs.agentbox.ru/en/agents/codex/) template with Python.
2. Prepare a model provider API key. The example uses `gpt-6-sol`.
3. Prepare a Mattermost server with an HTTPS address. The connector needs access to this server to exchange messages. AgentBox sandboxes need access to download attachments and upload files created by the agent. If you need to deploy Mattermost, follow the [instructions below](#if-mattermost-is-not-installed).
4. Create a bot using the [connection guide](../integrations/mattermost/connect.md) and save its token.

You will use the Mattermost address and bot token in the next step, when you [fill in the Orpheus settings](launch.md#fill-in-the-settings).

## If Mattermost is not installed

On a Linux server with Docker, download the official stack:

```sh
git clone https://github.com/mattermost/docker.git mattermost-server
cd mattermost-server
cp env.example .env
mkdir -p volumes/app/mattermost/{config,data,logs,plugins,client/plugins,bleve-indexes}
sudo chown -R 2000:2000 volumes/app/mattermost
```

Set [`DOMAIN`](https://docs.mattermost.com/deployment-guide/server/deploy-containers), the PostgreSQL password and a pinned [`MATTERMOST_IMAGE_TAG`](https://docs.mattermost.com/deployment-guide/server/deploy-containers) in [`.env`](https://docs.mattermost.com/deployment-guide/server/deploy-containers). Start the services:

```sh
docker compose -f docker-compose.yml -f docker-compose.without-nginx.yml up -d
```

Point your domain's HTTPS reverse proxy to port 8065 and preserve WebSocket connections. Open the site and create an administrator, team and test channel. Then create the bot using the connection guide. See the [Mattermost guide](https://docs.mattermost.com/deployment-guide/server/deploy-containers) for TLS and network details.

Next: [start the services](launch.md).
