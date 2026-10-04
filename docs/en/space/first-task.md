# First schedule

Verify the path from schedule to agent response after [connecting Orpheus](setup.md). Open `http://localhost:8086` in the local example.

1. In **Schedules**, click **New schedule**. Name it `Space check` and set **Prompt** to `Reply SPACE_OK. Do not send messages anywhere.`
2. Under **Repeat**, choose **Every few minutes**, then **Every minute**. Check the time zone and upcoming occurrences.
3. Select **New session for each run** and **Active**. Leave model empty. Leave services unselected. Save the schedule.
4. Wait until the next minute. Open the schedule: an occurrence appears in **Run history**. When its dispatch state becomes **Accepted**, click **Pause** to prevent further runs. The accepted run will continue.
5. Open the history entry. Wait until **Observed run status** is **Completed**, refreshing the page if needed. Click **Load result**: the final answer should contain `SPACE_OK`.
6. Delete the test schedule. Its history remains, but it will not fire again.

If submission stays **Dispatching**, inspect the error code. `core_unavailable` indicates an unreachable Orpheus address. If the run is accepted but never executes, check the Orpheus worker. See [diagnostics](operations.md#diagnostics).

[Schedule settings](schedules.md) · [CLI and skill](cli.md)
