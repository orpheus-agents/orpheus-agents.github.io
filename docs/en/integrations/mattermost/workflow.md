# The general workflow

A workflow combines routing, a profile, a template and agent instructions. Each file contains YAML between `---` markers followed by Markdown.

<<< @/../examples/quickstart/workflow.md.example{yaml}

Replace [`RECONCILE_FROM`](../../reference/mattermost.md#workflow-reconcile-from) with a fixed UTC processing start time, such as deployment time. The quick-start initializer does this automatically. Do not move this timestamp on every restart.

Without [`include_ids`](../../reference/mattermost.md#workflow-include-ids), a workflow handles accessible channels not reserved by specialized workflows. By default, a bot mention starts a new thread.

Add [`direct_messages: true`](../../reference/mattermost.md#workflow-direct-messages) for direct messages. Private channels and group messages require [`private_channels: true`](../../reference/mattermost.md#workflow-private-channels) and [`group_messages: true`](../../reference/mattermost.md#workflow-group-messages) respectively. The bot must be added to the relevant channels and groups. Only one workflow per bot can own direct messages.

The file body is the assistant's complete instruction set. The example includes attachment reading and file delivery rules. Adapt them to the assistant's role.

## Let users choose a profile by hashtag {#profile-tags}

To offer several models in one channel, add [`profile_by_tag`](../../reference/mattermost.md#workflow-profile-by-tag) to the workflow YAML. Use the names of active [profiles](../../configuration/profiles.md) and [templates](../../configuration/templates.md#manage) from your Orpheus catalog.

```yaml
profile: default
sandbox_template: codex
profile_by_tag:
  fast:
    profile: codex-fast
  research:
    profile: research
    sandbox_template: opencode
```

With this configuration, `@orpheus Compare the reports #research` uses the `research` profile and the `opencode` template. With `#fast`, the thread uses `codex-fast` and inherits `codex`. With no matching tag, it uses `default` and `codex`.

Put the tag in the first message that calls the bot into the thread. This can be a reply in an existing discussion. To choose another profile or template after the bot has accepted the request, start a new thread.

## Give the agent access to services

Select [services](../../configuration/secrets.md#services) from the Orpheus catalog for the agent:

```yaml
services: [helpdesk]
```

The catalog must contain `helpdesk`, and its credential sources must be set on the Orpheus worker. You can combine `services` with [`env_from`](../../reference/mattermost.md#workflow-env-from). The bot token used by file hooks remains run-scoped unless you explicitly select it for the session.

[Channel workflows](channels.md) · [Apply changes](reload.md) · [All settings](../../reference/mattermost.md)
