# Planning a deployment

A pilot needs an administrator, a process owner and access to the services used by the agent.

| Component | Purpose | Managed by |
| --- | --- | --- |
| Orpheus, PostgreSQL and web interface | Run tasks, keep history and inspect results | Your team |
| Mattermost and its connector | Converse with agents | Your team |
| AgentBox | Execute agents in sandboxes | Your AgentBox project |
| Model access | Power the Codex agent | API key or account owner |
| Company tools | Access business data | Owners of those systems |

## Decisions to make

- Where to deploy the services and who operates them.
- Which data agents can read and which actions they can perform.
- Who reviews results before contacting customers or changing business data.
- How people enter the web interface. SSO controls admission. Admitted users share the same history.
- Which budget and concurrency limits suit the process.

Allow for infrastructure, sandbox execution and model usage costs. Orpheus token counters help analyze usage but are not a monetary bill.

[AgentBox pricing](https://docs.agentbox.ru/en/billing/) · [Quick start](../getting-started/requirements.md)
