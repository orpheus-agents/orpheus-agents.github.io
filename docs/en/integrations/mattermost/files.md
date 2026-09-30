# Attachments and links

Attach a document or image to the task message. The connector prepares the files before execution and gives the agent their paths.

For returned files, the workflow must tell the agent:

```text
Read .orpheus/mattermost/current-run.json.
Move each completed output file atomically into its outbox directory.
Then send the final answer.
```

Files are attached to the run's last answer.

| Limit | Default |
| --- | --- |
| Files per post (1 to 100) | 5 |
| Ordinary input file | 10 MiB |
| Input image | 20 MiB |
| Input batch | 100 MiB |
| Output files (1 to 100 subject to the Mattermost server limit) | 5 |
| Each output file | 30 MiB |

Configure these in the workflow's [`files`](../../reference/mattermost.md#workflow-files-max-per-post) mapping. The input batch limit cannot exceed 100 MiB.

Links to messages in another channel or thread are expanded, explicitly adding their content to the agent's context. Defaults are up to 5 links and 20 posts. Configure [`link_expansion.enabled`](../../reference/mattermost.md#workflow-link-expansion-enabled), [`max_links`](../../reference/mattermost.md#workflow-link-expansion-max-links) and [`max_posts`](../../reference/mattermost.md#workflow-link-expansion-max-posts).

To deliver attachment clarifications to a running agent, supply [`AGENTBOX_API_KEY`](../../reference/mattermost.md#env-agentbox-api-key) to the connector. Without it, file-containing batches wait for the next run. Text clarifications remain immediate. A run accepts up to 32 clarification batches containing files.

If a file cannot be read or delivered, check sandbox connectivity to Mattermost, file size and hook results.
