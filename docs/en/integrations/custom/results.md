# Read results and events

For a simple integration, periodically read the [run resource](../../reference/api/get-run.md). Terminal states are `completed`, `failed` and `cancelled`. The answer is in [`final_message.text`](../../reference/api/get-run.md) when a final message exists. Check status and errors as well. Having answer text alone does not establish success.

Use SSE for live updates:

```sh
curl -N "http://localhost:8000/api/v1/sessions/$SESSION_ID/events/stream" \
  -H "Authorization: Bearer $ORPHEUS_API_KEY"
```

## Recover after disconnects

1. Fetch [history](../../reference/api/get-history.md) and retain [`event_cursor`](../../reference/api/get-history.md).
2. Open the stream with that cursor as [`after`](../../reference/api/stream-events.md).
3. Store processed event IDs.
4. Reconnect with the last ID in [`Last-Event-ID`](../../reference/api/stream-events.md). This header takes precedence over [`after`](../../reference/api/stream-events.md).
5. If the cursor is invalid, fetch a new history snapshot.

History includes messages and tool calls. Follow [`next_cursor`](../../reference/api/get-history.md) to read it completely. Events also support [ordinary HTTP requests](../../reference/api/get-events.md).

SSE delivers updates promptly. Current-state checks and delivery tracking are needed independently of the connection. Use a separate HTTP client without a short request timeout for streaming.
