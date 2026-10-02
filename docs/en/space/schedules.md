# Schedules and results

## Create a schedule

In **Schedules**, enter a name and an instruction for the agent. Include sources, constraints and the destination for the result. A new run does not receive the conversation where the task was discussed. Name any required channel or document explicitly.

Choose daily, weekdays, selected days, monthly, or intervals in hours or minutes. Other rules use a five-field [cron expression](../reference/space-api/schema-createschedule.md). For example, `0 10 * * 1-5` means 10:00 on weekdays.

A new schedule starts with the interface time zone. Review the zone and the next five occurrences before saving. Changing the header time zone changes date display, not the stored time zone of existing schedules.

| Setting | Use |
| --- | --- |
| Active / Paused | Enable or suspend future occurrences |
| New session for each run | Start each task with fresh context |
| Continue the same session | Keep context between runs |
| Model | Optional model name overriding the base profile's model |
| Owner email | Filter schedules by person. Empty means shared |

When creating a schedule in the web interface, the owner is prefilled from [SSO](access.md) email when available. You can change it or clear it for a shared schedule. Creating through the API without `owner_email` leaves the schedule shared.

[API fields and accepted values](../reference/space-api/schema-createschedule.md).

## Environment variables {#environment}

A schedule combines base environment names with additional [`env_from`](../reference/space-api/schema-createschedule.md) names. Select from the available names. Values are neither entered in the form nor stored in Space. The additional ENV selector is hidden when there are no available choices.

Every Space user can select any available name. If a name is missing, ask the administrator to [configure ENV forwarding](../reference/space.md#environment).

## Pausing and context

Pausing and deletion stop future occurrences but do not cancel a run already accepted by Orpheus. Resuming chooses a future time. After downtime, Space considers only the latest due occurrence without queuing every missed period.

If the previous run is still active, the next occurrence is skipped. If its outcome is unknown, Space waits until the outcome is known to avoid duplicate execution. Agent failures are not retried automatically.

**Reset context** starts a new session on the next run. Reset is unavailable while an occurrence is active. See [exact recurrence and context rules](../reference/space-api/conventions.md#execution).

## History and results

The list shows the latest run. History distinguishes submission to Orpheus from agent execution: `accepted` does not mean the task completed successfully.

The occurrence card shows the stored status, observation time and synchronization errors. Fetching a result separately calls Orpheus. If Orpheus is unavailable, stored history stays readable. Fetch the result again after connectivity recovers.

[States and errors](operations.md#diagnostics) · [API conventions](../reference/space-api/conventions.md)
