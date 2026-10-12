# GitLab MR review configuration

These settings belong to the [GitLab connector](../integrations/gitlab/connect.md). Process environment variables take precedence over a local `.env` file.

## Connections {#connections}

| Variable | Default | Purpose |
| --- | --- | --- |
| <span id="env-gitlab-base-url"></span>`GITLAB_BASE_URL` | `required` | GitLab base URL |
| <span id="env-gitlab-token"></span>`GITLAB_TOKEN` | `required` | Bot API token for publication and reviewer management. Not sent to the sandbox |
| <span id="env-orpheus-base-url"></span>`ORPHEUS_BASE_URL` | `required` | Orpheus API base URL without `/api/v1` |
| <span id="env-orpheus-api-key"></span>`ORPHEUS_API_KEY` | `required` | Service Bearer key accepted by Orpheus |
| <span id="env-orpheus-web-base-url"></span>`ORPHEUS_WEB_BASE_URL` | `ORPHEUS_BASE_URL` | Public web base URL for session links |
| <span id="env-workflows-dir"></span>`WORKFLOWS_DIR` | `workflows` | Directory of workflow files, relative to the process working directory unless absolute |

## Process and limits {#process}

| Variable | Default | Purpose |
| --- | --- | --- |
| <span id="env-app-mode"></span>`APP_MODE` | `prod` | `prod` or `dev` |
| <span id="env-log-level"></span>`LOG_LEVEL` | `error` | Log verbosity. Use `info` for operation diagnostics |
| <span id="env-http-timeout-seconds"></span>`HTTP_TIMEOUT_SECONDS` | `30` | Timeout of an individual HTTP request |
| <span id="env-poll-interval-seconds"></span>`POLL_INTERVAL_SECONDS` | `30` | GitLab polling interval |
| <span id="env-shutdown-timeout-seconds"></span>`SHUTDOWN_TIMEOUT_SECONDS` | `20` | Graceful shutdown budget |
| <span id="env-run-timeout-seconds"></span>`RUN_TIMEOUT_SECONDS` | `3600` | Agent run timeout |
| <span id="env-hook-timeout-seconds"></span>`HOOK_TIMEOUT_SECONDS` | `300` | Session hook timeout |
| <span id="env-max-session-request-bytes"></span>`MAX_SESSION_REQUEST_BYTES` | `1048576` | Maximum bytes per workflow file and assembled session request. Range: 1–16777216 |
| <span id="env-reconcile-worker-count"></span>`RECONCILE_WORKER_COUNT` | `4` | Concurrent reconciliation tasks. Range: 1–64 |
| <span id="env-reconcile-queue-capacity"></span>`RECONCILE_QUEUE_CAPACITY` | `128` | Reconciliation queue capacity. Range: 1–4096 |
| <span id="env-max-concurrent-reviews"></span>`MAX_CONCURRENT_REVIEWS` | `4` | Concurrent reviews. Range: 1–1024. Constrained by Orpheus capacity as well |

All `*_SECONDS` settings accept positive integer seconds. Base URLs must use HTTP or HTTPS without embedded credentials, query parameters or fragments. Repository cloning in the sandbox requires HTTPS.

## Workflow fields {#workflow}

| Field | Default | Purpose |
| --- | --- | --- |
| <span id="workflow-id"></span>`id` | `required` | Stable unique workflow ID matching `[a-z0-9][a-z0-9_-]{0,79}` |
| <span id="workflow-project-ids"></span>`project_ids` | `omitted` | Nonempty list of unique positive GitLab project IDs. Omit for the fallback |
| <span id="workflow-profile"></span>`profile` | `required` | Existing [Orpheus profile](../configuration/profiles.md) |
| <span id="workflow-model"></span>`model` | `profile` | Optional model override |
| <span id="workflow-sandbox-template"></span>`sandbox_template` | `required` | Existing [sandbox template](../configuration/templates.md) |
| <span id="workflow-services"></span>`services` | `required` | Explicit list of unique [service codes](../configuration/secrets.md#services). `[]` is allowed |
| <span id="workflow-language"></span>`language` | `omitted` | Language tag, such as `en`, `ru` or `pt-BR`, for agent-authored text |
| <span id="workflow-notes"></span>`notes.success / notes.fail` | `English defaults` | Markdown templates for completion and failure notes. Each field is optional |

A nonempty Markdown review policy is required below the YAML. It replaces the profile instructions. See [examples and routing](../integrations/gitlab/workflows.md).

## Note placeholders {#note-placeholders}

| Placeholder | Value |
| --- | --- |
| <code v-pre>{{ .FindingsCount }}</code> | Confirmed finding count on success, including zero |
| <code v-pre>{{ .Reason }}</code> | Safe failure reason in English. No raw error or hook output |
| <code v-pre>{{ .SessionURL }}</code> | Public session URL on failure, or an empty string when unavailable |

Functions, conditions and other expressions are not supported. Explicitly blank fields, unknown substitutions and templates that can render an empty note are rejected. `language` does not translate templates or failure reasons.

## File validation {#validation}

The connector reads regular UTF-8 `.md` files at the directory root. Subdirectories, hidden files, names beginning with `#` and other extensions are skipped. IDs must be unique, project routes must not overlap, and at most one fallback is allowed. Nonregular or non-UTF-8 `.md` files, unknown fields, invalid YAML, an empty directory or an oversized file prevent the entire service from starting.

Workflows are loaded at startup. See [how to apply changes](../integrations/gitlab/workflows.md).
