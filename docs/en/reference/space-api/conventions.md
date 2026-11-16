# Space API conventions

Space has a separate [contract](index.md) and origin. Integrations send `Authorization: Bearer <space-key>` using Space's [`PUBLIC_API_KEYS`](../space.md#access). The web interface uses [its own session and CSRF](../../space/access.md).

## Recurrence and context {#execution}

Cron follows local time in the chosen time zone. During daylight saving transitions, missing times are skipped and repeated times occur twice. After downtime, only the latest due occurrence is considered.

If the previous run is confirmed active, the next occurrence gets `state=skipped` and `error_code=previous_run_active`. It does not wait in a queue. If submission has an unknown outcome or status synchronization fails, planning waits for recovery. Periods within the previous run's actual execution interval are skipped even after it finishes.

With `session_mode=reuse`:

| Change | Context for the next run |
| --- | --- |
| Prompt, name, owner, cron or time zone | Preserved |
| Profile, template, model, service codes, session mode or effective base configuration | New session |
| Explicit context reset | New session. An active occurrence returns `409 schedule_busy` |

Old sessions remain in Orpheus. Their namespace is `schedule`.

## Creation and edits

Required [creation fields](schema-createschedule.md) are `name`, `prompt`, `cron` and `timezone`. Defaults are `status=active`, `session_mode=new`, `model=null` and `services=[]`. Omitted profile/template fields use the configured creation defaults. With full access, an omitted owner means `owner_email=null`. For an ordinary SAML user it is filled from the session email. Cron has five fields. Macros, seconds, years and inline TZ are rejected. Use an IANA time zone such as `Europe/Moscow`, not `Local`.

[`PATCH`](update-schedule.md) changes only supplied fields. `null` clears model or owner, and `services: []` clears the service selection. Only callers with full access can change or clear ownership. Omitted profile/template fields preserve the stored names. The effective template must exist and be active for every ordinary edit and resume, including when its field is unchanged. A patch containing exactly `{"status":"paused"}` skips catalog validation. Additional fields make it an ordinary edit. Missing or inactive templates return `422` with `template_not_found` or `template_inactive` at `body.template`. Pausing removes the next run time. Resuming or editing cron/time zone chooses a new future time. Other edits preserve the planned time.

[`DELETE`](delete-schedule.md) hides the schedule from lists. Its card and history remain, with `deleted_at` set on the card. Repeated deletion returns `204`.

## Creation retries {#retries}

Send a UUID [`Idempotency-Key`](create-schedule.md) when creating a schedule. Repeating the same normalized body returns the original response, even after later edits or deletion. A different body with the same key returns `409`. Keys do not expire. The [`url` and `can_edit`](schema-schedule.md) fields are computed from the current public address and current ownership/deletion state even in replayed responses. Creation permissions are checked before replay.

A short example using the file in `examples/space`:

```python
import json
import os
import uuid
from pathlib import Path
from urllib.request import Request, urlopen

key = str(uuid.uuid4())
print("Idempotency-Key:", key)  # Save and reuse after an uncertain response.
request = Request(
    os.environ["ORPHEUS_SPACE_HOST"] + "/api/v1/schedules",
    data=Path("schedule.json").read_bytes(),
    headers={
        "Authorization": "Bearer " + os.environ["ORPHEUS_SPACE_API_KEY"],
        "Content-Type": "application/json",
        "Idempotency-Key": key,
    },
    method="POST",
)
with urlopen(request, timeout=20) as response:
    print(json.load(response)["id"])
```

The environment matches the [CLI](../space.md#cli). If the response is lost, reuse the saved key instead of generating a UUID, with the original body. Do not rerun the example with a new key to retry the same request.

## Manual runs {#manual-runs}

[`POST /api/v1/schedules/{id}/run`](run-schedule.md) stores a command to run a saved active or paused schedule. Send no body or query parameters and a nonzero UUID `Idempotency-Key`. The caller needs permission to edit the schedule. `202` returns the stored occurrence, not confirmation that the agent has started. Acceptance does not call Orpheus or validate its catalogs synchronously.

The worker uses the saved settings when preparing the occurrence. Edits made before preparation apply to that run. Once prepared, the request is fixed for subsequent submission attempts. Follow progress through the [occurrence](get-occurrence.md) and [result](get-occurrence-result.md) endpoints.

The key is scoped to one schedule and does not expire. Reusing it returns the same occurrence with its **current state**, even after completion or schedule deletion. Current ownership permissions are checked again. A new key requests a new occurrence. Another unfinished occurrence, including an unknown submission outcome, returns `409 schedule_busy`. A new command for a deleted schedule returns `409 schedule_deleted`.

A manual command does not change activity, cron, the next scheduled time or reusable context. Its history has [`trigger=manual`](schema-occurrence.md), and `scheduled_at` is the command acceptance time. It does not repeat an earlier failed run's reporting period or reset context after failure. A successful manual run contributes to [`last_successful_run`](../space-cli.md#scheduled-identity). Overlapping cron periods follow the [usual skip rules](#execution).

Pausing cancels pending scheduled occurrences but keeps pending manual commands. Deleting a schedule cancels both kinds of pending occurrences. Requests already prepared for submission and accepted runs retain their reconciliation behavior after either action.

## Filters and cursors

Repeat [`owner_email`](list-schedules.md) for up to 100 distinct addresses, combined with OR semantics. Addresses are trimmed and lowercased. Provider-specific aliases are not merged. `unowned=true` selects only shared schedules and cannot be combined with email filters.

Schedules are listed newest first. `limit` defaults to 50 and has a maximum of 200. Pass `next_cursor` as `cursor` with unchanged filters. New schedules do not enter an ongoing traversal, while edits and deletions reflect current data. [History](list-occurrences.md) also uses cursors.

## State and results

Lists, cards, history and settings read Space data. The [service](get-services.md), [profile](get-profiles.md) and [template](get-templates.md) catalogs and [`result`](get-occurrence-result.md) synchronously call Orpheus. The result's `fetched_at` does not replace history's status observation time `observed_at`.

A run that has not started returns `409`, a missing result returns `404`, and unavailable Orpheus returns `503`. See [diagnostics](../../space/operations.md#diagnostics).

Errors use `error: {code, message, phase, details}`. A detail path such as `["body", "name"]` or `["query", "limit"]` identifies the field. Codes include `required`, `invalid_type`, `unknown_field` and `invalid_value`. See the [error schema](schema-problem.md). API responses are not cached.

## History fields {#history}

An occurrence records a scheduled or manual execution. It can be skipped or fail to reach Orpheus, so run IDs and status may be `null`. See the [full schema](schema-occurrence.md).

| Field | Meaning |
| --- | --- |
| `id`, `schedule_id` | Occurrence and schedule IDs |
| `trigger` | `scheduled` for cron, `manual` for an explicit run command |
| `scheduled_at` | Cron due time or manual command acceptance time |
| `created_at`, `updated_at` | Creation and latest update of the Space record |
| `state` | Dispatch: `pending`, `dispatching`, `accepted`, `skipped`, `failed`, `cancelled` |
| `session_id`, `run_id` | Session and run IDs accepted by Orpheus |
| `run_status` | Last successfully read Orpheus execution status |
| `observed_at` | Time that status was successfully observed |
| `execution_started_at`, `finished_at` | Actual execution start and end |
| `error_code` | Dispatch error or reason for skipping |
| `run_error_code` | Agent execution error |
| `sync_error_code` | Status read failure. The previous observation is retained |
| `attempts`, `next_attempt_at` | Dispatch attempt count and next dispatch or synchronization attempt time |

## API error codes {#errors}

Main `error.code` values in the schedules API:

| HTTP | Code | Cause |
| --- | --- | --- |
| 401 | `unauthorized` | No valid credentials |
| 403 | `csrf_failed` | Invalid Origin or CSRF header |
| 403 | `schedule_forbidden` | The session cannot create for this owner or change this schedule |
| 404 | `schedule_not_found`, `occurrence_not_found`, `not_found` | Missing schedule, occurrence or route |
| 404 | `run_result_not_found` | Result record missing from Orpheus |
| 409 | `run_not_started` | Orpheus has not accepted the run |
| 409 | `schedule_busy` | Manual run or context reset while an occurrence is unfinished, including an unknown submission outcome |
| 409 | `schedule_deleted` | Editing a deleted schedule or requesting a new manual run for it |
| 409 | `idempotency_conflict` | Creation key already used with a different body |
| 413 | `request_too_large` | Body size exceeded |
| 415 | `unsupported_media_type` | JSON required |
| 422 | `validation_error`, `invalid_cursor` | Invalid fields or cursor |
| 503 | `core_unavailable`, `storage_unavailable` | Orpheus or Space storage unavailable |

These describe HTTP request failures. Stored occurrence errors such as `previous_run_active` belong to history fields, not the API response code. See [diagnostics](../../space/operations.md#diagnostics).

## Browser authentication {#authentication}

Browser writes require the exact `Origin` configured in [`ORPHEUS_PUBLIC_URL`](../space.md#access) and `X-Orpheus-CSRF: 1`. Space Web sends them automatically. The SAML callback instead validates the signed IdP response and a login started in the browser. A valid Bearer key does not require these headers. An invalid `Authorization` header returns `401` even with a valid browser session.

All authenticated users can read schedules and results. [Configured administrators](../../space/access.md#permissions) have full control. Other SAML users can create only for their session email and modify only their own schedules. Explicit `null` or another owner in creation returns `403 schedule_forbidden`. They cannot transfer, clear or claim ownership through PATCH. A session without email is read-only. Bearer keys and anonymous mode retain full access.

The [session response](schema-authsession.md) exposes `write_access` and `can_manage_all`. Each [schedule](schema-schedule.md) reports `can_edit`, which is false after deletion. These fields describe permissions and are not accepted in write requests.

## Service catalogs

The root [services endpoint](get-services.md) reads Orpheus and returns `{items: [...]}`. The [template catalog](get-templates.md) returns `items`, `next_cursor` and `prev_cursor`. It includes active and inactive records and accepts `active`, exact case-sensitive `name`, case-insensitive literal `name_contains`, `limit` (1–200, default 50) and `cursor`. Name filters are mutually exclusive. Preserve filters when using either returned cursor. Resolve stored selections and `default_template` from [settings](get-settings.md) with `name` and no activity filter. Services are selected explicitly without defaults. Every caller with read access sees the same catalog. Unknown codes return `422`, and a required catalog that is unavailable returns `503 core_unavailable`. Unchanged selections and clearing services do not require the service catalog. Resuming validates the full selection. A service definition change under the same code requires [resetting reusable context](reset-session.md). Prepared occurrence requests keep their accepted configuration.

The [profile catalog](get-profiles.md) also returns `items`, `next_cursor` and `prev_cursor`. It accepts `available`, `name`, `name_contains`, `limit` and `cursor`. `available=true` requires both the profile and its account to be active. Resolve the saved name and `default_profile` from [settings](get-settings.md) without this filter. Profile names remain case-sensitive and immutable. Reassigning a profile to an account does not reset reusable context. [Reset it explicitly](reset-session.md) to use the current profile on the next execution.

Creation, ordinary edits and resume require an existing active profile and account, even when `profile` is omitted from PATCH. Failures return `422` with `profile_not_found`, `profile_inactive` or `account_inactive` at `body.profile`. Exactly `{"status":"paused"}` and deletion skip this validation. Manual-run acceptance and idempotent replay retain their existing behavior.
