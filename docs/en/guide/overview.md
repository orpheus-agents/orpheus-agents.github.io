# What is Orpheus

Orpheus brings company AI agents, business data and work tools together. A colleague asks for help, for example, in Mattermost. An agent gathers context, performs actions and returns a result. Connect your systems to Orpheus to start AI tasks directly from them and give agents access to their data.

## What your company gets

- **Work across sources.** An agent can combine a ticket, documentation and CRM data when you provide the required tools and access.
- **A familiar entry point.** The Mattermost integration supports conversations, clarifications and files.
- **Task-specific setup.** Choose instructions, models and tools for different workflows.
- **Visibility.** The web interface shows execution history, tool calls, errors and token usage.

## The path of a task

```text
Colleague in Mattermost              Your system
          ↕                               ↕
 Mattermost connector              Your connector
          └──────────────┬────────────────┘
                         ↕
                      Orpheus
                         ↕
             Agent in an AgentBox sandbox
                         ↕
          ┌──────────────┴────────────────┐
          ↕                               ↕
       AI model                     Company systems
                            CRM · helpdesk · knowledge base
```

Orpheus runs in your infrastructure. An agent works inside an AgentBox sandbox, calls the AI model and performs actions in connected company systems.

Connect your system for either or both purposes:

- **Start AI tasks from events.** For example, a new helpdesk ticket starts an agent through [your connector](../integrations/custom/overview.md).
- **Give agents access to data and actions.** Set up [API, CLI or MCP tools](../configuration/tools.md) in the sandbox. An agent can then read tickets, search a knowledge base and add helpdesk comments.

The AI model receives the task text and the data the agent includes in its context. The permissions of [tokens given to the agent](../configuration/secrets.md) determine what it can read and change in company systems. For example, a support assistant can be allowed to read tickets and create internal comments.

[Explore use cases](use-cases.md) · [Deploy the platform](../getting-started/requirements.md) · [Connect your system](../integrations/custom/overview.md)
