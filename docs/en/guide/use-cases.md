# Capabilities and use cases

Start with a process that has clear inputs, a defined result and someone responsible for reviewing it.

| Task | Agent actions | Required access |
| --- | --- | --- |
| Draft a ticket reply | Read the request, find context and prepare an internal comment | Helpdesk API and knowledge base |
| Investigate an error | Compare the reported problem with documentation and available logs | Log-reading tool and documentation |
| Prepare a report | Process a spreadsheet, calculate metrics and return a file | Attachment or source API |
| Help a developer | Inspect a repository, prepare changes and explain the result | Git, repository access and instructions |
| Prepare a recurring summary | Collect data on a schedule and prepare a summary | [Space](../space/overview.md) and source API |

These are agent configuration examples. Supply access to each system through an API, CLI or MCP. The ready-made Mattermost connector receives tasks and delivers results.

## Run a pilot

1. Choose one process and a small user group.
2. Define the result: a draft reply, report file or completed action.
3. Give the agent the required tools and instructions.
4. Try both ordinary cases and requests with missing information.
5. Review usefulness, execution time and token usage in the web interface.

The [helpdesk example](../integrations/custom/helpdesk.md) demonstrates two ways to publish results.
