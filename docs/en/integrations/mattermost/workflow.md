# The general workflow

A workflow combines routing, a profile, a template and agent instructions. Each file contains YAML between `---` markers followed by Markdown.

<<< @/../examples/quickstart/workflow.md.example{yaml}

Replace [`RECONCILE_FROM`](../../reference/mattermost.md#workflow-reconcile-from) with a fixed UTC processing start time, such as deployment time. The quick-start initializer does this automatically. Do not move this timestamp on every restart.

Without [`include_ids`](../../reference/mattermost.md#workflow-include-ids), a workflow handles accessible channels not reserved by specialized workflows. By default, a bot mention starts a new thread.

Add [`direct_messages: true`](../../reference/mattermost.md#workflow-direct-messages) for direct messages. Private channels and group messages require [`private_channels: true`](../../reference/mattermost.md#workflow-private-channels) and [`group_messages: true`](../../reference/mattermost.md#workflow-group-messages) respectively. The bot must be added to the relevant channels and groups. Only one workflow per bot can own direct messages.

The file body is the assistant's complete instruction set. The example includes attachment reading and file delivery rules. Adapt them to the assistant's role.

[Channel workflows](channels.md) · [All settings](../../reference/mattermost.md)
