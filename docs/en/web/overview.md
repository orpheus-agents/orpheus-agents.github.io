# Activity overview

The web interface shows current load and agent results. Open your installation's web address. In the quick start, it is `http://localhost:8085`.

Select a period on the analytics page. Metrics include run count, currently active sessions, tokens and total run time. The chart groups activity by hour or day.

[Namespace](../reference/api/get-analytics-overview.md) breakdowns help compare processes such as Mattermost and helpdesk work. Click a namespace to filter the page.

## Read the metrics

- A period includes runs accepted during that period.
- Current active sessions show load now, independently of the date range.
- Total run time adds durations across runs. Parallel work can exceed the period's wall-clock duration.
- Token totals reflect stored agent reports. Monetary cost is not calculated here.

The web interface provides read access. Create tasks through Mattermost or your integration's API calls.

[Sessions and runs](sessions.md) · [Analytics API](../reference/api/get-analytics-overview.md)
