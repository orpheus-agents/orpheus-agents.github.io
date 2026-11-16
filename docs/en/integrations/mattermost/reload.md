# Apply configuration changes

Validate the workflow directory before applying changes:

```sh
docker compose run --rm --no-deps mattermost validate
docker compose kill -s SIGHUP mattermost
```

`SIGHUP` reloads the entire directory. If any file is invalid, the previous configuration remains active. Mount the whole directory in Compose, as in the quick start.

| Change | Action |
| --- | --- |
| Workflow instructions or policy | Validate and send SIGHUP |
| Profile or service definition changed under the same name in [`orpheus.toml`](../../configuration/profiles.md) | Recreate API and worker with the updated configuration. New sessions use the new definitions |
| New AgentBox build under the selected template name/tag | New sandboxes use the updated build. No connector reload is needed |
| Template catalog record, activity or description | Apply through [Web or API](../../configuration/templates.md#manage). No API or worker restart is needed. Accepted sessions keep their settings |
| Environment, token or new connection | Recreate the connector container |

Existing sessions keep their accepted settings and sandbox. If existing conversations need the new profile, service definition or sandbox build, increase [`revision`](../../reference/mattermost.md#workflow-revision) and reload the workflow. The next request starts a new session. Ordinary template or tool updates do not require this reset.

Changing instructions, profile, template or service selection changes the effective revision. Reordering service codes does not. Current work finishes. The next request starts a new session.

A rejected input is retained until the effective workflow revision changes. After correcting an unknown profile, template or service, increase `revision` and reload. The connector retries the rejected input without a restart. Rejection notices are deduplicated by revision, reason and input.

## Remove a workflow

First set [`draining: true`](../../reference/mattermost.md#workflow-draining). The connector stops admitting new work and delivers accepted results. Wait for completion, then remove the file and reload. Immediate removal can cancel active work. The bot leaves private channels that no longer have a matching workflow. Disabling private-channel access has the same effect.

Run one connector instance for each Mattermost server and bot identity. Replace it sequentially during updates.
