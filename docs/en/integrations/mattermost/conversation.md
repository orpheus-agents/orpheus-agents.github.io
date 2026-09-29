# Conversation, context and clarifications

The bot works within a thread. The first request includes conversation context. Later requests add new messages.

| Action | Result |
| --- | --- |
| Mention the bot in a new thread | Create a session and its first run |
| Mention it while working | Deliver a clarification to the active run |
| Mention it after completion | Start another run with saved context |
| Leave the thread idle | Idle time alone does not create a new session |

Example clarification: `@orpheus Include only active customers in the report.` It can adjust subsequent work but does not undo actions already performed.

The connector publishes completed progress messages and final answers. Set [`send_commentary_messages: false`](../../reference/mattermost.md#workflow-send-commentary-messages) to omit progress messages.

Limit initial context with [`initial_context_token_budget`](../../reference/mattermost.md#workflow-initial-context-token-budget). This is an approximate budget. API request-size limits also apply. Repeat a critical requirement in the current request.

After budget exhaustion, workspace loss or a revision change, the next request can create a replacement session. Reattach or link any document essential to the task.
