# Orpheus Space

Space is a workspace for Orpheus agent users. Set up recurring tasks to prepare a morning report, check a support queue or summarize the week. At the scheduled time, Space submits the task to Orpheus and records its execution history.

Space has its own web interface and [SSO login](access.md). You can give employees access to Space without granting access to the Orpheus web interface for administrators.

The final answer is available from schedule history. Space does not send it to a messenger automatically. To publish there, specify the destination in the prompt and give the agent the required tools and access.

## Using Space

1. Open **Schedules** and create a task. Describe what the agent should do and where to leave the result.
2. Select a repeat rule and time zone. Check the upcoming occurrences.
3. Save the schedule as **Active** or **Paused**.
4. After an occurrence, open its history and fetch the run result.

Everyone with Space access can view every schedule. [Administrators](access.md#permissions) can change all schedules. Other users can create for themselves and change only their own schedules. An empty owner email marks a shared schedule, which ordinary users can only read.

Users can also manage schedules by messaging an agent if the administrator has installed the [Space CLI and skill](cli.md). The skill instructs the agent to handle only the request author's schedules. These instructions do not enforce server permissions.

## Connections

```text
Browser → Space Web → Space API → Space database
Agent → Space CLI → Space API
Space worker → Orpheus → AgentBox
```

Space stores schedules and observed run statuses. Full results remain in Orpheus. Lists and history do not call Orpheus. Fetching a result makes a separate request.

[First schedule](first-task.md) · [Schedule settings](schedules.md) · [Deploy Space](setup.md) · [HTTP API](../reference/space-api/index.md)
