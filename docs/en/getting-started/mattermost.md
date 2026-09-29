# Start the Mattermost bot

Before starting, add the bot to your Mattermost team and test channel. Use the same bot token in [`.env`](launch.md#fill-in-the-settings).

Check [`workflows/assistant.md`](../integrations/mattermost/workflow.md):

- [`profile: default`](../reference/mattermost.md#workflow-profile) selects the profile from [`orpheus.toml`](../configuration/profiles.md).
- [`sandbox_template: codex`](../reference/mattermost.md#workflow-sandbox-template) selects the AgentBox template.
- [`mattermost.base_url`](../reference/mattermost.md#workflow-mattermost-base-url) contains the reachable Mattermost HTTPS address.
- [`reconcile_from`](../reference/mattermost.md#workflow-reconcile-from) fixes the start of message processing. `init.py` uses the configuration creation time in UTC. Earlier messages do not start tasks.

```sh
docker compose run --rm --no-deps mattermost validate
docker compose up -d mattermost
curl -fsS http://localhost:8081/readyz
```

Post a new message mentioning the bot in the test channel:

```text
@orpheus Prepare a short checklist for reviewing a sales report.
```

Use your bot's actual username. The connector discovers it from the token. If no answer arrives, see [troubleshooting](../operations/troubleshooting.md).

Next: [verify the result](first-task.md).
