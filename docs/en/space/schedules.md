# Schedules and results

The list opens with the **Active** filter. Choose **Paused** to find paused schedules or **All** to see both. Open a schedule's card to edit, run, pause or delete it.

## Create a schedule

In **Schedules**, enter a name and an instruction for the agent. Include sources, constraints and the destination for the result. A new run does not receive the conversation where the task was discussed. Name any required channel or document explicitly.

Choose daily, weekdays, selected days, monthly, or intervals in hours or minutes. Other rules use a five-field [cron expression](../reference/space-api/schema-createschedule.md). For example, `0 10 * * 1-5` means 10:00 on weekdays.

A new schedule starts with the interface time zone. Review the zone and the next five occurrences before saving. Changing the header time zone changes date display, not the stored time zone of existing schedules.

| Setting | Use |
| --- | --- |
| Active / Paused | Enable or suspend future occurrences |
| New session for each run | Start each task with fresh context |
| Continue the same session | Keep context between runs |
| Profile | Select the [agent configuration](../configuration/profiles.md) |
| Sandbox template | Select an [AgentBox environment](../configuration/templates.md) with the harness required by the profile (Codex or OpenCode) |
| Model | Optional override for the selected profile’s model |
| Owner email | Defines ownership and filters the list. Empty means shared |

The web interface fills the owner from [SSO](access.md). Ordinary users see a read-only owner field. Administrators can change it or clear it for a shared schedule. Creating through an API key without [`owner_email`](../reference/space-api/schema-createschedule.md) leaves the schedule shared. For an ordinary user’s cookie-authenticated request, omission fills the session email.

Profiles and templates come from the Orpheus catalogs. Search the profile list by name and load further pages as needed. New schedules use configured defaults, while existing schedules keep their stored choices. A selectable profile and its account must both be active. An inactive or removed selection remains visible. Creating, editing or resuming a schedule validates its effective profile, account and template through Orpheus, even when their names are unchanged. Pausing and deleting remain available.

Reassigning a profile to another account affects new sessions. An existing reusable session keeps its account and model settings. Use **Reset context** when no occurrence is active to apply the current profile on the next run.

[API fields and accepted values](../reference/space-api/schema-createschedule.md).

Space prepends [host-generated execution metadata](../reference/space-cli.md#scheduled-identity) to the saved instruction, including the schedule owner when present. This lets the skill identify the originating schedule without trusting identity claims inside the instruction.

## Services {#environment}

Select the systems the agent needs in the schedule's [`services`](../reference/space-api/schema-createschedule.md). The checklist shows names and descriptions. Expand the list beneath it to inspect ENV names for the selected services. Values are never shown or stored in Space. Schedule details list service names in one row. Hover, keyboard focus or tap reveals the description and ENV names.

All catalog entries are selectable for a schedule you can edit. There are no automatic selections. Empty means no services. If a required system is absent, ask the administrator to [configure a service](../configuration/secrets.md#services).

Unavailable or removed selections remain visible by code so you can preserve or remove them. You can preserve the selection or clear all services without the catalog. Any changed nonempty selection, including removal of only some codes, requires validation against Orpheus. Resuming a paused schedule also validates its full selection. Unrelated fields remain editable without the service catalog. A changed selection starts a new reusable session on the next eligible execution. If the administrator changes a service's ENV list under the same code, use **Reset context** to apply it to a reused session.

## Run a saved schedule now {#manual-runs}

Open the schedule card and click **Run now**. This works for active and paused schedules using their saved settings. It does not change the cron, activity, next scheduled time or reusable context.

The command adds a **Manual** entry to history. Its time is when Space accepted the command, not when the agent started. Follow the entry to see submission, execution and the result. A manual run is a new execution, not a repeat of the reporting period of an earlier failure. It does not reset context after an error.

Another unfinished occurrence blocks the command, including when the outcome of submission is unknown. Check history and wait for completion or recovery. After a network error, retry **Run now** in the same open card. If you reopen the card, check history before requesting another run to avoid repeating accepted work.

[Manual-run API and retry rules](../reference/space-api/conventions.md#manual-runs).

## Pausing and context {#pausing}

Pausing stops future cron occurrences and cancels those still pending, but keeps pending manual commands. Deletion cancels pending occurrences of both kinds. Requests already prepared for submission continue to be reconciled, and a run accepted by Orpheus is not cancelled. Resuming chooses a future time. After downtime, Space considers only the latest due cron occurrence without queuing every missed period.

If the previous run is still active, the next occurrence is skipped. If its outcome is unknown, Space waits until the outcome is known to avoid duplicate execution. Agent failures are not retried automatically.

**Reset context** starts a new session on the next run. Reset is unavailable while an occurrence is active. See [exact recurrence and context rules](../reference/space-api/conventions.md#execution).

With **Continue the same session**, a sandbox can expire during a long interval or while the schedule is paused. The [retention period](../configuration/sandbox-retention.md) defaults to 14 days. In the [occurrence](../reference/space-api/schema-occurrence.md), submission fails with `error_code=session_unavailable`, or an accepted run fails with `run_error_code=sandbox_lost`. Space keeps the selected mode and session association. On the schedule card, use **Reset context** when no occurrence is active. The next occurrence creates a new reusable session. There is no automatic reset or retry of an accepted failed run.

For intervals longer than retention, such as monthly runs with the default 14 days, the reused sandbox will normally be deleted before the next occurrence. Subsequent occurrences keep failing until context is reset. A reset only enables the next run: its new sandbox can expire again before the following occurrence. Choose **New session for each run** if continued agent context is unnecessary, or ask the administrator to set [retention](../reference/environment.md#env-sandbox-paused-retention-days) longer than the interval, up to 100 days. Space never changes this choice automatically.

## History and results

The list shows the latest run. History distinguishes submission to Orpheus from agent execution: `accepted` does not mean the task completed successfully.

The occurrence card shows the stored status, observation time and synchronization errors. Opening an entry automatically requests its result from Orpheus. If Orpheus is unavailable, stored history stays readable. Refresh the entry after connectivity recovers.

[States and errors](operations.md#diagnostics) · [API conventions](../reference/space-api/conventions.md)
