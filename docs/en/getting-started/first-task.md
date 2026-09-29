# Verify your first task

Confirm that the bot replied in the original thread. Open the web interface and find the session with namespace `mattermost/assistant`.

1. Open the latest run. Wait for `completed`.
2. Compare the incoming message and answer with the Mattermost thread.
3. Inspect token usage and execution time.
4. Mention the bot again in the same thread and ask it to expand one point. The session receives another run.
5. Attach a small text file and request a summary. Then ask for the result as a Markdown file.

A clarification sent while the agent works goes to the current run. A new task after completion starts another run.

## Stop the stack

```sh
docker compose down
```

The database remains in its volume. Run `docker compose up -d` to start again. Do not add `-v` when stopping if you want to preserve history.

Next, configure [profiles](../configuration/profiles.md) and [channel workflows](../integrations/mattermost/channels.md).
