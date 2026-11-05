# Conversation, context and clarifications

The bot works within a thread. The first request includes conversation context. Later requests add new messages. Mattermost automatically creates sessions with [`allow_multiple_runs: true`](../../reference/api/create-session.md) for this purpose. No workflow setting is needed.

| Action | Result |
| --- | --- |
| Mention the bot in a new thread | Create a session and its first run |
| Mention it while working | Deliver a clarification to the active run |
| Mention it after completion | Start another run with saved context |
| Return after the paused sandbox is deleted | Create a new session and rebuild context from the thread |

Example clarification: `@orpheus Include only active customers in the report.` It can adjust subsequent work but does not undo actions already performed.

The connector publishes completed progress messages and final answers. Set [`send_commentary_messages: false`](../../reference/mattermost.md#workflow-send-commentary-messages) to omit progress messages.

Limit initial context with [`initial_context_token_budget`](../../reference/mattermost.md#workflow-initial-context-token-budget). This is an approximate budget. API request-size limits also apply. Repeat a critical requirement in the current request.

After budget exhaustion, sandbox deletion, workspace loss or a revision change, the next request creates a replacement session. Paused sandboxes expire under the core's [retention policy](../../configuration/sandbox-retention.md), by default after 14 days since the latest run finished. The connector rebuilds available thread context and attachments. Files created only inside the old workspace cannot be restored. Reattach or link any document essential to the task.

If deletion races with submission, the connector rereads acceptance history before moving unaccepted input to a new session. An accepted run that fails with `sandbox_lost` is reported without an automatic rerun. Send a new request to continue.

An undelivered clarification from a successfully completed run can move to the next run. When it needs a new session, the connector preserves the saved clarification and restores attachments and available surrounding context, including the previous final answer. Newer unaccepted mentions are excluded from the transferred clarification’s context. Input from failed or cancelled runs is not transferred. Send a new request if it is still needed.

## Message author {#identity}

The connector identifies the author and channel of each post separately. The [Space skill](../../space/cli.md) uses the current requester’s email to select their schedules. See [metadata format and email availability](../../reference/mattermost.md#identity).
