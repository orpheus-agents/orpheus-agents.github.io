# A Markdown file and after_run

The agent prepares a file and a script posts it to the helpdesk. The publication token is supplied only to hooks through top-level [`services`](../../reference/api/create-session.md).

## Create the task

[`before_run`](../../configuration/hooks.md#hook-before-run) writes `replies/<run_id>.md` to `reply-path.txt`. Instructions tell the agent to read that path and atomically save the completed Markdown. A per-run path prevents publishing an old reply.

<<< @/../examples/helpdesk/create.py

## Publication script

Save `publish.py` beside `create.py`:

<<< @/../examples/helpdesk/publish.py

Set [`ORPHEUS_URL`](../../reference/api/conventions.md) and [`ORPHEUS_API_KEY`](../../reference/environment.md#env-public-api-keys) in the connector environment. Define the [`helpdesk` service](../../configuration/secrets.md#services) on API and worker, and supply its `HELPDESK_URL` and `HELPDESK_TOKEN` values to the worker. The example selects the service only for run hooks. The template needs Python 3.

The code uses the hypothetical helpdesk contract. If your API does not support `Idempotency-Key`, check for an existing comment before retrying. An arbitrary header alone does not prevent duplicates.

## Verify it

Test a normal reply, a missing file, an empty file and a helpdesk API failure. On publication errors, inspect [`after_run`](../../configuration/hooks.md#hook-after-run) in run details. Do not blindly repeat the entire assignment. First check whether the comment was created.

The hook-only selection in this request does not prevent selecting the same catalog service for an agent elsewhere. See [request scopes and catalog visibility](../../configuration/secrets.md#hook-secrets) when a publication token should stay outside service selectors.
