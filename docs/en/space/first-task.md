# First schedule

Verify the path from schedule to agent response after [connecting Orpheus](setup.md). Open `http://localhost:8086` in the local example.

1. In **Schedules**, click **New schedule**. Name it `Space check` and set **Prompt** to `Reply SPACE_OK. Do not send messages anywhere.`
2. Under **Repeat**, choose **Every few minutes**, then **Every minute**. Check the time zone and upcoming occurrences.
3. Select **New session for each run** and **Paused**. Leave model empty. Leave services unselected. Save the schedule.
4. In the saved schedule's card, click **Run now**. A **Manual** occurrence appears in **Run history**. The schedule stays paused, so the cron will not create further runs.
5. Open the history entry. Wait until **Observed run status** is **Completed**, refreshing if needed. The result loads automatically when the entry opens. Its final answer should contain `SPACE_OK`.
6. Delete the test schedule. Its history remains.

Before deleting the schedule, you can also check automatic execution: resume it, wait for the next minute and pause it again after the occurrence is accepted. [Pausing does not cancel accepted work](schedules.md#pausing).

If submission stays **Dispatching**, inspect the error code. `core_unavailable` indicates an unreachable Orpheus address. If the run is accepted but never executes, check the Orpheus worker. See [diagnostics](operations.md#diagnostics).

[Schedule settings](schedules.md) · [CLI and skill](cli.md)
