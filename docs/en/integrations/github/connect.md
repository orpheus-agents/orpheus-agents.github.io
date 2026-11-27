# Connect GitHub PR review

Request review from a dedicated GitHub user in **Reviewers**. Orpheus checks the diff and delivers
a GitHub review with inline findings. Request review again to check a new commit or revisit
the same commit.

## Configure access

1. Add the technical user to the organization and grant it **Write** for each repository you want
   to review. Give the connector a token with **Pull requests: Read and write** for those
   repositories.
2. Set up an Orpheus review profile and a sandbox with Git, GitHub CLI and HTTPS credentials.
   The sandbox needs read access to repository contents and pull requests.
3. Set `GITHUB_REPOSITORIES` to a comma-separated list of `owner/repo` names from one
   organization on GitHub.com. Set `GITHUB_TOKEN`, `ORPHEUS_BASE_URL` and `ORPHEUS_API_KEY`
   in the connector environment.

See the [connector configuration](https://github.com/orpheus-agents/orpheus-github-pr-review/blob/v0.1.0/docs/configuration.md)
and [Compose example](https://github.com/orpheus-agents/orpheus-github-pr-review/blob/v0.1.0/examples/compose.yaml).

## Set review instructions

Start with the [default workflow](https://github.com/orpheus-agents/orpheus-github-pr-review/blob/v0.1.0/examples/workflows/default.md).
Set the profile, sandbox template and service codes from your Orpheus configuration, then add
the review rules below the YAML. A workflow without `repository_ids` applies to the remaining
repositories in `GITHUB_REPOSITORIES`. The failure template can include <code v-pre>{{ .Reason }}</code> and
<code v-pre>{{ .SessionURL }}</code>. Restart the connector after editing a workflow.

## Run a pilot

Make a small change in an open PR and choose the technical user in **Reviewers**. The connector
polls every 30 seconds by default. After it submits the review, GitHub clears that user's
request. Run one connector per Orpheus instance, GitHub organization and reviewer identity.
