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

The Orpheus bot's own messages never trigger work. This avoids reply loops.

## Continuing the conversation

[`start_on_mention: false`](../../reference/mattermost.md#workflow-start-on-mention) changes new-thread admission. Mention the bot for subsequent channel requests. Direct messages need no mention when [`direct_messages`](../../reference/mattermost.md#workflow-direct-messages) is enabled.

To group several consecutive messages, set [`message_batch_window: 3s`](../../reference/mattermost.md#workflow-message-batch-window). The window starts with the first unaccepted trigger. With `0`, work starts immediately.

Test the automatic channel with a separate task and make sure its route does not overlap another specialized workflow.
