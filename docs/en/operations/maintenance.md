# Service management and updates

Run these commands from the example Compose directory.

```sh
docker compose ps -a
docker compose logs --tail=100 api worker mattermost
docker compose stop
docker compose up -d
```

`ps -a` also shows completed migrations. `stop` stops containers. `down` additionally removes containers and the network. The database volume remains unless `-v` is supplied.

## Update

1. Set [`draining: true`](../reference/mattermost.md#workflow-draining) on workflows and reload them.
2. Wait for active work and delivery to finish. Stop admission from custom connectors.
3. Back up the database and configuration.
4. Change image versions in [`.env`](../getting-started/launch.md#fill-in-the-settings).
5. Stop application services, pull images, migrate and start again:

```sh
docker compose stop mattermost web worker api
docker compose pull
docker compose run --rm migrate
docker compose up -d --force-recreate api worker mattermost web
```

6. Verify [`/ready`](monitoring.md), [`/readyz`](monitoring.md), web sign-in and a test task. Disable draining and resume event admission.

A plain `restart` does not apply changed Compose environment settings. Recreate containers instead. When updating a profile or template, account for the [workflow revision](../integrations/mattermost/reload.md).

Investigate failed migrations before starting applications. Rolling back an image does not roll back the database.
