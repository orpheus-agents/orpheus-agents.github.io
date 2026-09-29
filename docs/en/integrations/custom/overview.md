# Connect your own system

A connector turns events from your system into Orpheus assignments. It can be a small service, webhook handler or scheduled job.

```text
New ticket → connector → POST /sessions → agent
                                           ↓
Helpdesk ← agent API call or after_run ← result
```

## Assign responsibilities

| Your integration | Orpheus | Agent |
| --- | --- | --- |
| Select events and gather context | Execute work and retain history | Solve the task with available tools |
| Associate source objects with sessions | Accept new runs and clarifications | Prepare a reply or file |
| Define delivery and retries | Expose states, events and results | Follow the supplied instructions |

The API accepts arrays of text messages. Prepare files in the sandbox separately. The source of a task and its destination can be different systems.

A separate session for each event is enough for a simple connector. For a chat connector, choose [`allow_multiple_runs: true`](../../reference/api/create-session.md) to [continue the conversation](continuation.md) in one session. Set up [result delivery](results.md) and [retry handling](reliability.md).

Examples use Python's standard library. They demonstrate individual operations rather than a complete webhook server. A [Go client](https://github.com/orpheus-agents/orpheus/tree/main/client) is also available.
