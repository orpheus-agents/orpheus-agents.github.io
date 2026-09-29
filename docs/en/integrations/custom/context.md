# Context, files and access

Supply messages in conversation order. Orpheus accepts the array atomically. Earlier entries become context and the last starts the task.

```json
{
  "messages": [
    {"text": "Customer: I cannot export the report."},
    {"text": "Operator: Please share the error message."},
    {"text": "Customer: Permission denied. Prepare an internal reply."}
  ]
}
```

This is a fragment of a [session creation](../../reference/api/create-session.md) or [run creation](../../reference/api/create-run.md) request. Context required by the model belongs in [`text`](../../reference/api/create-session.md). Store internal IDs, versions and delivery settings in [`metadata`](../../reference/api/create-session.md).

## Files

The public Orpheus API accepts text rather than binary attachments. The sandbox does not yet exist when you send the session creation request. Prepare files through [`before_run`](../../configuration/hooks.md#hook-before-run): this hook runs inside the prepared sandbox before each agent run.

1. Set the script in [`configuration.hooks.before_run`](../../reference/api/create-session.md) when creating the session. The script should download attachments from your system and save them in the workspace.
2. Pass the ticket ID or file URL through top-level [`env`](../../reference/api/create-session.md), and the access token through [`env_from`](../../reference/api/create-session.md). For another assignment, you can supply these in the [create run request](../../reference/api/create-run.md).
3. In the task message, tell the agent where the hook will save the files. For example: “Review the attachments in `attachments/` and prepare a reply for the operator.”

The first run follows this order: Orpheus creates the sandbox → the hook downloads files → the agent starts with the attachments ready.

## Access

Select only the required names in [`configuration.sandbox.env_from`](../../reference/api/create-session.md). If a hook owns publication, use top-level [`env_from`](../../reference/api/create-session.md) for its token.

Do not place credentials in message text or [`metadata`](../../reference/api/create-session.md), which are retained in history. See [secret configuration](../../configuration/secrets.md) for worker-based delivery.
