# Connect GitLab MR review

The [GitLab MR review connector](https://github.com/orpheus-agents/orpheus-gitlab-mr-review) starts a review when you assign its bot as a merge request reviewer. It publishes findings and a completion note in GitLab, then removes itself from the reviewer list. Other reviewers remain assigned.

The connector polls GitLab. It needs no incoming webhook or public port.

## Prepare access

You need a [running Orpheus instance](../../getting-started/launch.md), a [profile](../../configuration/profiles.md) for review and a [sandbox template](../../configuration/templates.md) with:

- The agent runtime and tools required by your review rules.
- Git, Python 3, `base64`, `gzip` and `sha256sum`.
- `glab` with read access to MR metadata and discussions.
- Working Git authentication for HTTPS cloning and fetching private repositories. The connector uses the HTTPS repository URL returned by GitLab.

Give the connector its own GitLab bot token with API access to the projects, permission to publish discussions and notes, and permission to update reviewers. Add the bot to the projects you want it to review.

Give the **sandbox** separate read-only repository and GitLab API credentials through an Orpheus [service](../../configuration/secrets.md#services) or the template. The connector's [`GITLAB_TOKEN`](../../reference/gitlab-review.md#env-gitlab-token) is not copied to the agent. Selecting a service passes its variables to the sandbox but does not configure Git authentication. Configure and test HTTPS Git access in your template as well.

GitLab must be reachable over HTTPS from both the connector and AgentBox sandboxes. Check clone, fetch and `glab` access from the sandbox network, especially for a private GitLab installation.

For example, add this service to [`orpheus.toml`](../../configuration/profiles.md) on API and worker:

```toml
[services.gitlab]
name = "GitLab read access"
description = "Read repositories, merge requests and discussions."
env_from = ["GITLAB_HOST", "GITLAB_TOKEN"]
```

Set these variables on the **Orpheus worker** for the sandbox tools. Here `GITLAB_TOKEN` must hold the read-only token, separate from the connector bot token. Configure the template to use these credentials for HTTPS Git access too.

## Start the connector

In your documentation repository clone:

```sh
cd examples/gitlab-review
cp .env.example .env
```

Fill in the [connection settings](../../reference/gitlab-review.md#connections) in `.env`. Use addresses reachable from the connector container. Set the Orpheus API key to a value accepted by [`PUBLIC_API_KEYS`](../../reference/environment.md#env-public-api-keys). Set the web address to the URL your reviewers can open.

Edit `workflows/review.md`: replace project ID `123` with your GitLab project ID, select an existing [profile, template and services](../../reference/gitlab-review.md#workflow), and write your review rules. The example names `review`, `gitlab-review` and `gitlab` must match your Orpheus setup.

```sh
docker compose config --quiet
docker compose pull
docker compose up -d
docker compose logs --tail=100 review
```

To override other [process settings](../../reference/gitlab-review.md#process), add them to `review.environment` in `compose.yaml`. The Compose `.env` file supplies only variables referenced by the Compose configuration.

The example pins a published image and mounts workflows read-only. The connector image is published for `linux/amd64`. The example selects that platform explicitly. On an ARM machine, Docker needs amd64 emulation.

## Verify a review

1. Open a small MR in the configured project and assign the bot as reviewer. Draft MRs are also eligible.
2. Wait for the next [poll](../../reference/gitlab-review.md#env-poll-interval-seconds), 30 seconds by default.
3. Inspect the session and run in the [Orpheus web interface](../../web/sessions.md).
4. Check the findings and completion note in GitLab. A completed review can have zero confirmed findings.

After completion or failure, assign the bot again to request another review. Automatic review does not approve or merge the MR.

[Configure review rules](workflows.md) · [Results and diagnostics](operations.md)
