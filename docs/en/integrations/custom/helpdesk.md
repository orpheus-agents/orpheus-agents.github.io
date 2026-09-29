# Example: helpdesk tickets

Goal: prepare an internal comment for an operator when a new ticket arrives. The agent reads context, proposes a solution and drafts a customer reply.

The helpdesk is hypothetical. Paths such as `/tickets/{id}/comments`, fields `body` and `internal`, and `Idempotency-Key` support form an example contract. Replace them with your product's API.

| Decision | Agent publishes directly | Hook publishes |
| --- | --- | --- |
| Publication token | Available to the agent | Supplied to [`after_run`](../../configuration/hooks.md#hook-after-run) |
| Agent output | API comment | Markdown file |
| Delivery defined in | Instructions and tool | Publication code |
| Useful when | The agent needs varied helpdesk actions | Format and delivery timing are fixed |

In both cases, a thin connector receives the event, gathers context and creates a session. It does not need to forward the final answer if the agent or hook already published it.

Choose [direct API publication](helpdesk-direct.md) or [Markdown with after_run](helpdesk-hook.md). When the customer writes again, [continue the session](continuation.md) with new context.

Add customer-facing messages or status changes as explicit process rules. This example prepares output for the operator.
