# Connect GitHub PR review

Request review from a dedicated GitHub user in **Reviewers**. Orpheus checks the diff and delivers
a GitHub review with inline findings. Request review again to check a new commit or revisit
the same commit.

## Configure access

1. Grant the technical user **Write** for each repository you want to review. Give the
   connector a token with **Pull requests: Read and write** for those repositories.
2. Set up an Orpheus review profile and a sandbox with Git, GitHub CLI and HTTPS credentials.
   The sandbox needs read access to repository contents and pull requests.
3. Set `GITHUB_TOKEN`, `ORPHEUS_BASE_URL` and `ORPHEUS_API_KEY` in the connector environment.

The connector discovers writable repositories accessible to the token on every poll. Set
`GITHUB_REPOSITORIES` to a comma-separated list of `owner/repo` names to limit the discovery.

See the [connector configuration](https://github.com/orpheus-agents/orpheus-github-pr-review/blob/v0.2.0/docs/configuration.md)
and [Compose example](https://github.com/orpheus-agents/orpheus-github-pr-review/blob/v0.2.0/examples/compose.yaml).

## Set review instructions

Start with the [default workflow](https://github.com/orpheus-agents/orpheus-github-pr-review/blob/v0.2.0/examples/workflows/default.md).
Set the profile, sandbox template and service codes from your Orpheus configuration, then add
the review rules below the YAML. A workflow without `repository_ids` applies to the remaining
repositories in the polling scope. The failure template can include <code v-pre>{{ .Reason }}</code> and
<code v-pre>{{ .SessionURL }}</code>. Restart the connector after editing a workflow.

## Run a pilot

Make a small change in an open PR and choose the technical user in **Reviewers**. The connector
polls every 30 seconds by default. After it submits the review, GitHub clears that user's
request. Run one connector per Orpheus instance and reviewer identity.
