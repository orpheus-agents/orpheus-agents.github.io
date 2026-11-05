# Channel-specific workflows

Keep [`assistant.md`](workflow.md) as the general workflow with [`profile: default`](../../reference/mattermost.md#workflow-profile). Create `analysis.md` for a channel handling complex tasks:

```yaml
---
id: analysis
revision: "1"
reconcile_from: "2026-09-29T12:00:00Z"
profile: deep-analysis
sandbox_template: codex
include_ids:
  - CHANNEL_ID
mattermost:
  base_url: https://chat.example.com
  token_env: MATTERMOST_BOT_TOKEN
---
```

After the YAML, add analysis instructions and the general workflow's file-handling rules. Use the channel ID, not its name. Replace the timestamp with the processing cutover for that channel.

In the [profile example](../../configuration/profiles.md), `default` uses Terra and `deep-analysis` uses Sol with `xhigh`. Channel routing selects the profile without additional user commands.

In this example, tasks are routed as follows:

- `analysis.md` handles the channel listed in [`include_ids`](../../reference/mattermost.md#workflow-include-ids).
- The general [`assistant.md`](workflow.md) continues to handle the other accessible channels. The channel assigned to `analysis.md` is automatically excluded from the general workflow.

To prevent a workflow from handling a channel, add the channel ID to [`exclude_ids`](../../reference/mattermost.md#workflow-exclude-ids).

Do not assign one channel to two specialized workflows: configuration validation will report an error.

Validate the directory, then [apply the change](reload.md). Increase [`revision`](../../reference/mattermost.md#workflow-revision) after changing a profile under its existing name.

## Private channels

Listing a channel in [`include_ids`](../../reference/mattermost.md#workflow-include-ids) does not enable private channels. Set [`private_channels: true`](../../reference/mattermost.md#workflow-private-channels) in the matching workflow before adding the bot. Group messages require their own [`group_messages`](../../reference/mattermost.md#workflow-group-messages) opt-in.

The connector leaves joined private channels that have no matching workflow. It checks at startup, on reload and membership events, and during polling. Before starting or reloading the connector, enable [`private_channels`](../../reference/mattermost.md#workflow-private-channels) for every private channel where the bot must remain. Removing its route or disabling private channels also makes the bot leave. If removal fails, readiness and new runs remain blocked until a retry succeeds. Configure and reload the route before inviting the bot again.