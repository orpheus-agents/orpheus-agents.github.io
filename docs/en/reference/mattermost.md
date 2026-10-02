# Mattermost configuration

## Connector ENV

| Variable | Default | Purpose |
| --- | --- | --- |
| <span id="env-orpheus-base-url"></span>`ORPHEUS_BASE_URL` | `required` | Orpheus API base without /api/v1 |
| <span id="env-orpheus-api-key"></span>`ORPHEUS_API_KEY` | `required` | Service Bearer key |
| <span id="env-workflows-dir"></span>`WORKFLOWS_DIR` | `workflows` | Flat directory of .md workflow files |
| <span id="env-listen-addr"></span>`LISTEN_ADDR` | `:8080` | Health and metrics listener |
| <span id="env-http-timeout"></span>`HTTP_TIMEOUT` | `30s` | HTTP request timeout |
| <span id="env-max-request-bytes"></span>`MAX_REQUEST_BYTES` | `1048576` | Request budget, 4096 to 1048576 bytes |
| <span id="env-max-parallel-threads"></span>`MAX_PARALLEL_THREADS` | `8` | Parallel thread reconciliations, 1 to 128 |
| <span id="env-agentbox-api-key"></span>`AGENTBOX_API_KEY` | `unset` | File clarifications during active runs |
| <span id="env-agentbox-api-url"></span>`AGENTBOX_API_URL` | `SDK default` | Optional SDK endpoint override |

## Workflow YAML

| Field | Default | Purpose |
| --- | --- | --- |
| <span id="workflow-id"></span>`id` | `required` | Unique workflow name |
| <span id="workflow-revision"></span>`revision` | `required` | Revision string |
| <span id="workflow-reconcile-from"></span>`reconcile_from` | `required` | Fixed UTC RFC3339 processing cutover |
| <span id="workflow-profile"></span>`profile` | `required` | Orpheus profile name |
| <span id="workflow-sandbox-template"></span>`sandbox_template` | `required` | AgentBox template name |
| <span id="workflow-mattermost-base-url"></span>`mattermost.base_url` | `required` | Mattermost URL |
| <span id="workflow-mattermost-token-env"></span>`mattermost.token_env` | `required` | Bot token ENV name |
| <span id="workflow-env-from"></span>`env_from` | `[]` | Worker variables selected for the agent |
| <span id="workflow-include-ids"></span><span id="workflow-exclude-ids"></span>`include_ids / exclude_ids` | `[]` | Included and excluded channel IDs |
| <span id="workflow-direct-messages"></span>`direct_messages` | `false` | Handle direct messages |
| <span id="workflow-private-channels"></span>`private_channels` | `false` | Handle private channels |
| <span id="workflow-group-messages"></span>`group_messages` | `false` | Handle group messages |
| <span id="workflow-start-on-mention"></span>`start_on_mention` | `true` | Require a mention to start a thread |
| <span id="workflow-trigger-bot-ids"></span>`trigger_bot_ids` | `[]` | Allowed external bots |
| <span id="workflow-send-commentary-messages"></span>`send_commentary_messages` | `true` | Publish progress messages |
| <span id="workflow-draining"></span>`draining` | `false` | Deliver accepted results without admitting new work |
| <span id="workflow-message-batch-window"></span>`message_batch_window` | `0` | Message batching window |
| <span id="workflow-poll-interval"></span>`poll_interval` | `30s` | Channel reconciliation interval |
| <span id="workflow-full-reconcile-interval"></span>`full_reconcile_interval` | `5m` | Full session reconciliation interval |
| <span id="workflow-max-concurrent-runs"></span>`max_concurrent_runs` | `10` | Concurrent workflow runs |
| <span id="workflow-run-timeout-seconds"></span>`run_timeout_seconds` | `3600` | Agent execution timeout |
| <span id="workflow-hook-timeout-seconds"></span>`hook_timeout_seconds` | `120` | File hook timeout |
| <span id="workflow-max-session-tokens"></span>`max_session_tokens` | `100000000` | Session token budget |
| <span id="workflow-max-post-chars"></span>`max_post_chars` | `12000` | Post character limit, also capped by the server |
| <span id="workflow-initial-context-token-budget"></span>`initial_context_token_budget` | `100000` | Approximate initial context budget |
| <span id="workflow-files-max-per-post"></span>`files.max_per_post` | `5` | Input files per post, 1 to 100 |
| <span id="workflow-files-max-file-bytes"></span>`files.max_file_bytes` | `10485760` | Ordinary input file bytes |
| <span id="workflow-files-max-image-bytes"></span>`files.max_image_bytes` | `20971520` | Input image bytes |
| <span id="workflow-files-max-batch-bytes"></span>`files.max_batch_bytes` | `104857600` | Input batch bytes, maximum 100 MiB |
| <span id="workflow-files-max-output-files"></span>`files.max_output_files` | `5` | Output file count, 1 to 100 subject to the Mattermost server limit |
| <span id="workflow-files-max-output-bytes"></span>`files.max_output_bytes` | `31457280` | Bytes per output file |
| <span id="workflow-link-expansion-enabled"></span>`link_expansion.enabled` | `true` | Expand same-server Mattermost links |
| <span id="workflow-link-expansion-max-links"></span>`link_expansion.max_links` | `5` | Expanded link count |
| <span id="workflow-link-expansion-max-posts"></span>`link_expansion.max_posts` | `20` | Linked post count |

Mandatory fields are marked `required`. Unknown fields, duplicate keys, duplicate IDs and overlapping specialized routes are rejected. Quote `revision` as a string. Put the complete agent instructions after the YAML.

Do not store secrets in workflow files. `token_env` and [`env_from`](../configuration/secrets.md) hold variable names. [Examples](../integrations/mattermost/workflow.md) · [Apply changes](../integrations/mattermost/reload.md).

## Message author and channel {#identity}

Each post reaches the agent as a separate message with front matter:

```yaml
---
kind: thread
post_id: post-id
root_id: root-id
channel: {"id":"channel-id","name":"dev-test-group"}
author: {"id":"user-id","username":"alice","nickname":"Alice","email":"alice@example.com"}
created_at: 2026-10-01T07:00:00Z
---
```

`channel.name` is the name in `~dev-test-group` without `~`. Direct and group channels use generated names. Linked threads carry their own authors and channels.

Email comes from the Mattermost profile. Bot and webhook posts do not carry email. Empty optional fields are omitted. This lets the [Space skill](../space/cli.md) identify the author of a specific request, but does not itself establish access permissions.

For email-based tools, the connector token must read other users' addresses. An ordinary bot requires Mattermost's `PrivacySettings.ShowEmailAddress` setting. Check `GET /api/v4/users/{human-user-id}` with the connector token: email on the bot's own profile is not sufficient. If the address is unavailable, the agent must not guess the schedule owner.
