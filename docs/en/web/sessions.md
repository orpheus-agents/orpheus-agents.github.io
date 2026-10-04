# Sessions and runs

Use the session list to find a conversation or inspect unfinished work. Filter by activity, status, [namespace and external key](../reference/api/list-sessions.md). Sorting by latest run helps locate recently updated conversations.

Session details show profile, model, sandbox state, token usage and runs. Select a run to inspect its messages, tools and hooks.

## Investigate a problem

1. Find the `mattermost/assistant` or `helpdesk` namespace.
2. Open the session for the relevant thread or ticket.
3. Select the latest run.
4. Check its status and error phase.
5. Inspect the unsuccessful tool or hook.

Session status describes its work. After a run finishes, the conversation can continue if the session was created with [`allow_multiple_runs: true`](../reference/api/create-session.md).

Share the detail-page link with a colleague who has web access. History is shared among admitted users. The interface reconnects after interruptions. Check its connection indicator when assessing whether updates are current.

[States](../reference/states.md) · [History details](history.md)

## Services

Session and run cards show the [accepted service snapshots](../configuration/secrets.md#changes): service names in one row. Hover, keyboard focus or tap reveals the description and ENV names. Values are hidden. Session services are available to the agent and session hooks. Run services apply only to `before_run` and `after_run`. The cards retain their accepted definitions even when the current catalog changes.
