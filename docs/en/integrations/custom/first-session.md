# Your first API session

Creating a session also accepts its first task. Configure the [`default`](../../configuration/profiles.md) profile and make the [`codex`](../../configuration/templates.md) template available first.

<<< @/../examples/create-session.json

Save the JSON as `request.json`. Set [`ORPHEUS_API_KEY`](../../reference/environment.md#env-public-api-keys) in your shell to the server's service key and send:

```sh
curl --fail-with-body http://localhost:8000/api/v1/sessions \
  -H "Authorization: Bearer $ORPHEUS_API_KEY" \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: helpdesk:ticket:4821:event:105' \
  --data-binary @request.json
```

The `202 Accepted` response contains [`session_id`](../../reference/api/create-session.md), [`run_id`](../../reference/api/create-session.md) and [`message_id`](../../reference/api/create-session.md). It confirms admission. Execution results arrive later. Store these identifiers in your system.

[`namespace`](../../reference/api/create-session.md) groups integration sessions. [`external_key`](../../reference/api/create-session.md) associates a session with a ticket but does not prevent multiple sessions for that ticket. Use [`Idempotency-Key`](../../reference/api/conventions.md#requests) for retries.

The task text is in [`messages[].text`](../../reference/api/create-session.md). [`metadata`](../../reference/api/create-session.md) is kept in history and is not passed to the agent. If the agent needs the ticket number, also include it in the text or instructions.

[Create session method](../../reference/api/create-session.md) · [Read the result](results.md)
