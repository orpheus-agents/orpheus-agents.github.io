# Core concepts

| Term | Meaning | Example |
| --- | --- | --- |
| Agent | A task executor with a model, instructions and tools | Support assistant |
| Profile | Named model and authentication settings | `default`, `deep-analysis` |
| Workflow | Mattermost routing settings and agent instructions | Assistant for a support channel |
| Session | Conversation context and working environment | Handling one ticket |
| Run | One assignment within a session | Prepare the initial reply |
| Clarification | New information for a running agent | Additional error details |
| Sandbox | Environment containing files and tools | Codex in AgentBox |
| Template | Prepared sandbox software | Codex, Python and a helpdesk CLI |
| Hook | Preparation or finalization script | Publish a reply file |
| Namespace | Integration or process label | `helpdesk` |

A session runs one assignment at a time. Send clarifications while the agent works. After completion, start another run with the saved context. Configuration is captured when a session is created. Editing a profile does not reconfigure an existing conversation.

[Lifecycle and states](../reference/states.md) · [Continue a task](../integrations/custom/continuation.md)
