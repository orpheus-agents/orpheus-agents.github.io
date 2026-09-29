# Skills, CLI and MCP

Install company tools in the agent environment. Orpheus selects the prepared template and supplies authorized credentials.

| Method | Use when | Prepare |
| --- | --- | --- |
| HTTP API | A few simple operations are enough | Request instructions, endpoint and token |
| CLI | The system provides a useful command-line tool | Binary, dependencies and brief instructions |
| MCP | An MCP server exposes the tools | Codex client configuration and server access |
| Skill | A procedure should be repeatable | Instructions and supporting files |

A support assistant might use a helpdesk CLI and a knowledge-base search skill. Instructions define the procedure. Token permissions define the available operations.

Add tools using the [template definition guide](https://docs.agentbox.ru/en/templates/definition/). Put Codex configuration and skills in the locations used by the agent installed in that template. Verify discovery in a new sandbox.

Keep real secrets out of images. Supply them through [environment variables](secrets.md). After building, run a test assignment and inspect tool calls in history.
