# A Markdown file and after_run

The agent prepares a file and a script posts it to the helpdesk. The publication token is supplied only to hooks through top-level [`env_from`](../../reference/api/create-session.md).

## Create the task

[`before_run`](../../configuration/hooks.md#hook-before-run) writes `replies/<run_id>.md` to `reply-path.txt`. Instructions tell the agent to read that path and atomically save the completed Markdown. A per-run path prevents publishing an old reply.

<<< @/../examples/helpdesk/create.py

## Publication script

Save `publish.py` beside `create.py`:

<<< @/../examples/helpdesk/publish.py

Set [`ORPHEUS_URL`](../../reference/api/conventions.md) and [`ORPHEUS_API_KEY`](../../reference/environment.md#env-public-api-keys) in the connector environment. Set [`HELPDESK_URL`](../../configuration/secrets.md) and [`HELPDESK_TOKEN`](../../configuration/secrets.md) on the worker and allow both names in API and worker [`HARNESS_ENV_ALLOWLIST`](../../reference/environment.md#env-harness-env-allowlist). The template needs Python 3.

The code uses the hypothetical helpdesk contract. If your API does not support `Idempotency-Key`, check for an existing comment before retrying. An arbitrary header alone does not prevent duplicates.

## Verify it

Test a normal reply, a missing file, an empty file and a helpdesk API failure. On publication errors, inspect [`after_run`](../../configuration/hooks.md#hook-after-run) in run details. Do not blindly repeat the entire assignment. First check whether the comment was created.
