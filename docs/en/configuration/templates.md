# Sandbox environment and templates

A template defines the software and files available to an agent. Start with the ready-made [codex](https://docs.agentbox.ru/en/agents/codex/) template. For company workflows, prepare a template with the required CLI tools, skills and MCP configuration.

1. Define the environment using the [AgentBox guide](https://docs.agentbox.ru/en/templates/).
2. Add software, dependencies and usage instructions.
3. Build the template in the AgentBox project used by the worker's key.
4. Register the template in Orpheus as described below.
5. Set the template name in [`configuration.sandbox.template`](../reference/api/create-session.md) when creating a session through the API, or in [`sandbox_template`](../reference/mattermost.md#workflow-sandbox-template) when [configuring a Mattermost workflow](../integrations/mattermost/workflow.md).
6. Create a new session and verify the tools.

Mattermost requires Linux and Python 3.9 or newer. The connector installs its attachment scripts automatically.

## Register templates in Orpheus

Add each allowed template to [`orpheus.toml`](profiles.md), alongside the agent profiles. At least one template is required:

```toml
[templates.codex]
description = "Codex sandbox"

[templates."company-agent:stable"]
description = "Company tools and skills"
```

The key must match the exact AgentBox template name, including its tag. Registration does not build or verify the template in AgentBox. The optional description appears in the [template catalog](../reference/api/get-templates.md) and must not contain secrets. New sessions reject unregistered names with HTTP 422 (`unknown_template`).

Use the same configuration for the API and worker, then restart both after changes. Removing a template does not change existing sessions. [Space](../space/schedules.md) uses this catalog when creating schedules or changing their execution settings.

## Environment changes

Updating an image does not change existing sandboxes. After updating a Mattermost template, increment the workflow [`revision`](../reference/mattermost.md#workflow-revision). In a [custom integration](../integrations/custom/overview.md), create a new session with the desired template.

With [`allow_multiple_runs: true`](../reference/api/create-session.md), files and context survive sandbox pauses between runs. In the default mode, the sandbox is deleted after its only run. Keep published results in the destination system.

[Template names](https://docs.agentbox.ru/en/templates/names/) · [Tags and versions](https://docs.agentbox.ru/en/templates/tags/)
