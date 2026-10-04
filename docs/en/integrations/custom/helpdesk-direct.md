# Let the agent publish a comment

The connector creates a session for a new ticket. The agent receives helpdesk credentials and publication instructions.

Configure the [`helpdesk` service](../../configuration/secrets.md#services) on API and worker, and supply its `HELPDESK_URL` and `HELPDESK_TOKEN` values to the worker. Select it in the request:

```json
{
  "agent": {
    "profile": "default",
    "instructions": "Read ticket 4821 using HELPDESK_URL and HELPDESK_TOKEN. Investigate the issue. POST an internal comment to /tickets/4821/comments with JSON fields body and internal=true. Include the likely cause, checks and a draft reply. Do not contact the customer or close the ticket."
  },
  "sandbox": {
    "template": "codex",
    "services": ["helpdesk"]
  }
}
```

This is the [`configuration`](../../reference/api/create-session.md) value in a [create-session request](first-session.md). Put the incoming ticket text in [`messages`](../../reference/api/create-session.md). In your integration, use the ticket ID from the event and supply brief API or CLI instructions.

## Verify it

1. Create a test ticket.
2. Inspect the helpdesk API call in tool history.
3. Confirm that an internal comment appears in the correct ticket.
4. Redeliver the source event with the same idempotency key. No additional task should appear.

The agent can use the supplied token. Restrict its permissions to the required operations. For a fixed publication procedure, use [after_run](helpdesk-hook.md).
