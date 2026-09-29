# Messages, tools and hooks

History explains where an answer came from and which stage failed.

| Item | Inspect |
| --- | --- |
| User message | Task text and supplied context |
| Agent message | Progress explanation or final answer |
| Tool call | Arguments, command, result and exit code |
| Hook | Data preparation or result publication |
| Technical journal | States and operational events |

Tool inputs appear before the call completes. Expand the output separately. Large messages and results may need expansion. Truncated output is marked explicitly.

If the agent produced an answer but delivery failed, inspect [`after_run`](../configuration/hooks.md#hook-after-run). If the agent never started, inspect workspace preparation and [`before_run`](../configuration/hooks.md#hook-before-run).

History loads in pages. For long runs, load earlier entries or use the history API. Markdown images appear as links so viewing history does not make background requests to third-party servers.

[Troubleshooting](../operations/troubleshooting.md) · [History API](../reference/api/get-history.md)
