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
| Profile | Select the [agent configuration](../configuration/profiles.md) |
| Sandbox template | Select the [AgentBox environment](../configuration/templates.md) |
| Model | Optional override for the selected profile’s model |
| Owner email | Defines ownership and filters the list. Empty means shared |

The web interface fills the owner from [SSO](access.md). Ordinary users see a read-only owner field. Administrators can change it or clear it for a shared schedule. Creating through an API key without [`owner_email`](../reference/space-api/schema-createschedule.md) leaves the schedule shared. For an ordinary user’s cookie-authenticated request, omission fills the session email.

Profiles and templates come from the Orpheus catalogs. New schedules use the configured defaults, while existing schedules keep their stored choices. Creating a schedule or changing these choices requires Orpheus to be reachable.

[API fields and accepted values](../reference/space-api/schema-createschedule.md).

## Services {#environment}

Select the systems the agent needs in the schedule's [`services`](../reference/space-api/schema-createschedule.md). The checklist shows names and descriptions. Expand the list beneath it to inspect ENV names for the selected services. Values are never shown or stored in Space. Schedule details list service names in one row. Hover, keyboard focus or tap reveals the description and ENV names.

All catalog entries are selectable for a schedule you can edit. There are no automatic selections. Empty means no services. If a required system is absent, ask the administrator to [configure a service](../configuration/secrets.md#services).

Unavailable or removed selections remain visible by code so you can preserve or remove them. You can preserve the selection or clear all services without the catalog. Any changed nonempty selection, including removal of only some codes, requires validation against Orpheus. Resuming a paused schedule also validates its full selection. Unrelated fields remain editable without the service catalog. A changed selection starts a new reusable session on the next eligible execution. If the administrator changes a service's ENV list under the same code, use **Reset context** to apply it to a reused session.

## Pausing and context

Pausing and deletion stop future occurrences but do not cancel a run already accepted by Orpheus. Resuming chooses a future time. After downtime, Space considers only the latest due occurrence without queuing every missed period.

If the previous run is still active, the next occurrence is skipped. If its outcome is unknown, Space waits until the outcome is known to avoid duplicate execution. Agent failures are not retried automatically.

**Reset context** starts a new session on the next run. Reset is unavailable while an occurrence is active. See [exact recurrence and context rules](../reference/space-api/conventions.md#execution).

## History and results

The list shows the latest run. History distinguishes submission to Orpheus from agent execution: `accepted` does not mean the task completed successfully.

The occurrence card shows the stored status, observation time and synchronization errors. Fetching a result separately calls Orpheus. If Orpheus is unavailable, stored history stays readable. Fetch the result again after connectivity recovers.

[States and errors](operations.md#diagnostics) · [API conventions](../reference/space-api/conventions.md)
