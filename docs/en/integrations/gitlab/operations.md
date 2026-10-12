# Results and operations

## Read the result

The connector publishes confirmed findings in MR discussions and a completion note. Review the full [session history](../../web/history.md) to inspect the agent's checks, tool output and hook errors. The agent's final response is part of that history, not a comment automatically copied to GitLab.

On later reviews, the connector can update its own discussions, resolve addressed findings and report recurring problems. It leaves human discussions and other reviewers unchanged.

If the MR diff changes, the MR closes or the bot is removed from reviewers during analysis, the connector cancels or discards obsolete work. When the diff changes, it also removes itself from reviewers without posting a note. Assign the bot again to review the new revision. It does not publish the old review against the changed diff. For another review after completion or failure, assign the bot again. An unsuccessful analysis is not retried automatically.

## Run one instance

Run exactly one connector for each GitLab installation and bot identity. Stop the old process before starting its replacement. Increasing replicas does not increase supported review capacity. Use [`MAX_CONCURRENT_REVIEWS`](../../reference/gitlab-review.md#env-max-concurrent-reviews) instead, within the capacity of Orpheus and your providers.

The connector exposes no HTTP API or health endpoint and needs no separate database. Monitor process status and JSON logs on stdout. Configuration, startup and runtime failures exit with code `1`. [`LOG_LEVEL`](../../reference/gitlab-review.md#env-log-level) controls verbosity.

On shutdown, accepted Orpheus runs continue. After restart, the connector recovers them and resumes publication. Transient publication errors are retried without starting another analysis.

To update the [Compose example](connect.md), change the image version in `.env`, then:

```sh
docker compose pull
docker compose stop review
docker compose up -d review
docker compose logs --tail=100 review
```

## Diagnose a review

| Symptom | What to check |
| --- | --- |
| The connector exits at startup | JSON error log, required [connection settings](../../reference/gitlab-review.md#connections), readable workflow directory and [file validity](../../reference/gitlab-review.md#validation) |
| An assigned MR does not start | Bot access, reviewer assignment, open MR state, [poll interval](../../reference/gitlab-review.md#env-poll-interval-seconds) and [concurrency limit](../../reference/gitlab-review.md#env-max-concurrent-reviews) |
| Skip note in GitLab | Add the project to a [workflow](workflows.md), restart and assign the bot again |
| Session creation fails | Existing profile, template and service codes, API key and both request-size limits: the [connector limit](../../reference/gitlab-review.md#env-max-session-request-bytes) and Orpheus [`MAX_REQUEST_BYTES`](../../reference/environment.md#env-max-request-bytes) |
| `before_run` fails | HTTPS clone/fetch access, required sandbox tools and whether the MR changed during preparation |
| Agent completed, publication failed | Inspect `after_run`, connector logs and GitLab API permissions. A final answer alone is not a publishable review |
| No session link in a failure note | Set the public [web URL](../../reference/gitlab-review.md#env-orpheus-web-base-url). A failure before session creation has no session URL |

[Workflow settings](workflows.md) · [Configuration reference](../../reference/gitlab-review.md)
