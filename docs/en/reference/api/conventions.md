# HTTP API conventions

Supply a service key through `Authorization: Bearer …`. In examples, `ORPHEUS_URL` is the server origin and method paths start with `/api/v1`.

## Requests

- Set `Content-Type: application/json` for JSON bodies.
- Use `Idempotency-Key` for session creation, run creation and clarifications.
- `202` confirms admission. Read run state to obtain the outcome.
- Timestamps use RFC3339. Session and run identifiers are UUIDs.
- Cursors are opaque. Follow [`next_cursor`](list-sessions.md) and [`has_more`](list-sessions.md) where present. Start from the first page after changing filters.

## Errors

| HTTP | Check |
| --- | --- |
| 400 | Request or cursor format |
| 401 | Bearer key or browser session |
| 403 | Access mode. Cookies provide read access only |
| 404 | Resource identifier |
| 409 | Session state, idempotency conflict or exhausted budget |
| 413 | Request size |
| 415 | Content-Type |
| 422 | Field paths in [`error.details`](schema-error.md) |
| 503 | Execution capacity or service availability |

Read [`error.code`](schema-error.md) for the exact category. Retry uncertain transport outcomes with the same body and key. Fix invalid requests before retrying.

An explicitly invalid Authorization header does not fall back to browser authentication. Empty [`PUBLIC_API_KEYS`](../environment.md#env-public-api-keys) disables service commands in `anonymous` and `saml` modes.

[Complete reference](index.md) · [Reliable integration](../../integrations/custom/reliability.md)
