# A channel with automatic starts

For an incoming-task channel, create a specialized workflow and disable the mention requirement for new threads:

```yaml
include_ids:
  - INBOX_CHANNEL_ID
start_on_mention: false
```

Add this YAML fragment to a complete [channel workflow](channels.md). Each eligible new thread starts a task without `@orpheus`.

If an external bot or webhook posts messages that start threads in the channel, allow its ID:

```yaml
trigger_bot_ids:
  - SOURCE_BOT_ID
```

The connector's own bot can start work with a **new root message** that explicitly mentions its current username, for example `@orpheus Process task A`. This works in every channel type, including DMs, regardless of `start_on_mention` and `trigger_bot_ids`. Its replies inside threads never start work.

A scheduled agent can use this to create independent tasks in a channel under the bot account. Each root uses that channel's workflow. Avoid instructions that keep creating new roots: the root-only rule does not limit deliberate chains.

## Continuing the conversation

[`start_on_mention: false`](../../reference/mattermost.md#workflow-start-on-mention) changes new-thread admission. For subsequent channel requests, mention the bot or use a [configured name](workflow.md#trigger-names). Direct messages need no mention when [`direct_messages`](../../reference/mattermost.md#workflow-direct-messages) is enabled.

To group several consecutive messages, set [`message_batch_window: 3s`](../../reference/mattermost.md#workflow-message-batch-window). The window starts with the first unaccepted trigger. With `0`, work starts immediately.

Test the automatic channel with a separate task and make sure its route does not overlap another specialized workflow.
