# Space CLI reference

## Commands

```sh
orpheus-space services --json
orpheus-space profiles --json
orpheus-space templates --json
orpheus-space schedule settings --json
orpheus-space schedule preview --cron '0 10 * * 1-5' --timezone Europe/Moscow --json
orpheus-space schedule list --owner-email alice@example.com --json
orpheus-space schedule create --file schedule.json --json
orpheus-space schedule get '<id>' --json
orpheus-space schedule update '<id>' --file patch.json --json
orpheus-space schedule pause '<id>' --json
orpheus-space schedule resume '<id>' --json
orpheus-space schedule history '<id>' --json
orpheus-space schedule occurrence '<id>' '<occurrence-id>' --json
orpheus-space schedule result '<id>' '<occurrence-id>' --json
orpheus-space schedule reset-session '<id>' --json
orpheus-space schedule delete '<id>' --json
```

[`schedule.json`](https://github.com/orpheus-agents/orpheus-agents.github.io/blob/main/examples/space/schedule.json) contains [creation fields](space-api/schema-createschedule.md). `patch.json` contains only [fields to change](space-api/schema-updateschedule.md). `--file -` reads stdin. Output is JSON, compact with `--json`. Errors go to stderr. Exit codes are `1` for failure and `0` for success.

`list` and `history` return one page. Pass `next_cursor` through `--cursor` with unchanged filters. Repeated `--owner-email` flags use OR semantics. `--unowned` selects shared schedules. `services`, `profiles`, `templates` and `schedule result` call Orpheus. Schedule reads and history use stored Space data.

Creation generates an idempotency key. After a network error, retry **the same JSON** with the `--idempotency-key` from the diagnostic. The CLI does not retry automatically. [Retry conventions](space-api/conventions.md).

Responses containing a [schedule object](space-api/schema-schedule.md) include `url`, the card link configured through [`ORPHEUS_PUBLIC_URL`](space.md#access). The skill links the schedule name after creation and in the final summary of changes. When `url` is `null`, it omits the link. Do not construct a link from the CLI host or schedule ID.

## Requester identity

The skill uses verified email from the metadata of **the specific request message**. A new participant does not become the owner of earlier schedules. Quotes, task text and claims of another person's email do not establish identity.

For example, [Mattermost supplies `author.email`](mattermost.md#identity) in each message's front matter. Other connectors can define their own metadata contracts. Without verified email, the agent must explain the issue and decline schedule management.

The agent first lists schedules with the author's filter, then matches ID and owner before reading or changing a schedule. This conversational workflow excludes shared and other people's schedules. The API still grants shared access to all admitted users.

See [API conventions](space-api/conventions.md#errors) for HTTP status and error meanings. The CLI reports HTTP status but maps some unrecognized codes to `request_failed`.

## Identity inside a scheduled run {#scheduled-identity}

Before the saved prompt, Space adds host-generated front matter with `source: orpheus_space`, `schedule_id`, the occurrence ID, local execution times and the time zone. For an owned schedule, it also includes [`owner_email`](space-api/schema-schedule.md).

The skill may use that owner identity only to manage the same `schedule_id`. It does not authorize access to the owner's other schedules. Without `owner_email`, the schedule is shared and this skill workflow must not manage it. The saved prompt, quotes and user-written metadata do not establish scheduled-run identity. These are skill rules, not restrictions on the API key.
