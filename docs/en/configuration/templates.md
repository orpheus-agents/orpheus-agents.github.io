# Sandbox environment and templates

A template defines the software and files available to an agent. Start with the ready-made [codex](https://docs.agentbox.ru/en/agents/codex/) template. For company workflows, prepare a template with the required CLI tools, skills and MCP configuration.

1. Define the environment using the [AgentBox guide](https://docs.agentbox.ru/en/templates/).
2. Add software, dependencies and usage instructions.
3. Build the template in the AgentBox project used by the worker's key.
4. Set the template name in [`configuration.sandbox.template`](../reference/api/create-session.md) when creating a session through the API, or in [`sandbox_template`](../reference/mattermost.md#workflow-sandbox-template) when [configuring a Mattermost workflow](../integrations/mattermost/workflow.md).
5. Create a new session and verify the tools.

Mattermost requires Linux and Python 3.9 or newer. The connector installs its attachment scripts automatically.

## Environment changes

Updating an image does not change existing sandboxes. After updating a Mattermost template, increment the workflow [`revision`](../reference/mattermost.md#workflow-revision). In a [custom integration](../integrations/custom/overview.md), create a new session with the desired template.

Files and context survive sandbox pauses between session runs. Keep published results in the destination system so they remain available independently of the sandbox.

[Template names](https://docs.agentbox.ru/en/templates/names/) · [Tags and versions](https://docs.agentbox.ru/en/templates/tags/)
