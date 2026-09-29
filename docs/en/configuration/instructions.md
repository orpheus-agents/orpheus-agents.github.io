# Agent instructions

Instructions define the agent's task, data sources and expected output. Keep them separate from the user's request.

```text
You assist a support operator.
Read the ticket and find the relevant knowledge-base article.
If information is missing, list questions for the operator.
Prepare an internal comment: cause, verification, draft reply.
Do not contact the customer or change the ticket status.
```

Set shared instructions in the profile's [`instructions`](../reference/profiles.md#profile-instructions) string. The API field [`configuration.agent.instructions`](../reference/api/create-session.md) replaces profile instructions when supplied. In Mattermost, the workflow Markdown body becomes the instructions. Include every rule that assistant needs.

## What to include

- Role and task boundaries.
- Tools to use when gathering information.
- When to ask for missing data.
- Where to save or publish the result.
- Actions that require human participation.

For file results, specify a path and format. For Mattermost, include the [`current-run.json`](../integrations/mattermost/files.md) and outbox instructions from the [workflow example](../integrations/mattermost/workflow.md).

Evaluate instructions against real tasks. Reinforce written restrictions with suitable API token permissions.
