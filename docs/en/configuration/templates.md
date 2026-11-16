# Sandbox environment and templates

A template defines the software and files available to an agent. Prepare a template in your AgentBox project with Codex, the required CLI tools, skills and MCP configuration. Orpheus registers templates owned by the project identified by its [AgentBox key](../reference/environment.md#env-agentbox-api-key).

1. Define and build the environment using the [AgentBox guide](https://docs.agentbox.ru/en/templates/).
2. Include Codex CLI and the tools your workflows need. Mattermost also requires Linux and Python 3.9 or newer. The connector installs its attachment scripts automatically.
3. Register the template in Orpheus as described below.
4. Use its exact catalog name in [`configuration.sandbox.template`](../reference/api/create-session.md), a Mattermost workflow's [`sandbox_template`](../reference/mattermost.md#workflow-sandbox-template), or a [Space schedule](../space/schedules.md).
5. Create a new session and verify the tools.

## Register a template {#register}

Open **Settings → Templates** in Orpheus Web and choose **Add template**. Enter the alias from your AgentBox project, for example `company-agent` or `team/company-agent`. Enter the optional tag in its separate field. Add a description to help users choose the environment. New templates are active by default.

Orpheus checks that the template and tag exist in your AgentBox project. This does not build the template, start a sandbox or check build readiness. Supply the same AgentBox key and endpoint settings to API and worker. A missing key or unavailable AgentBox prevents registration with HTTP `503`. Reading, editing and deleting catalog records do not call AgentBox.

Names and tags are converted to lowercase on registration. A tag must be a tag name, not a build UUID. When the tag is omitted, registration checks `default` and stores the name without a suffix. Future sandboxes follow that default without pinning a build. Explicit `:default` remains a separate catalog entry.

The catalog is stored in PostgreSQL. Changes apply immediately without restarting API or worker. A new installation starts with an empty catalog.

### Through the API

Send a [registration request](../reference/api/create-template.md) with a Bearer key:

```python
import json
import os
from urllib.request import Request, urlopen

request = Request(
    os.environ["ORPHEUS_URL"] + "/api/v1/templates",
    data=json.dumps({
        "template_name": "team/company-agent",
        "tag": "stable",
        "description": "Company tools and skills",
    }).encode(),
    headers={
        "Authorization": "Bearer " + os.environ["ORPHEUS_API_KEY"],
        "Content-Type": "application/json",
    },
    method="POST",
)
with urlopen(request, timeout=20) as response:
    template = json.load(response)
print(template["id"], template["name"])
```

[`active`](../reference/api/schema-createtemplate.md) defaults to `true`. A duplicate name or the same AgentBox template and tag returns `409`, including when the existing record is inactive. Do not store secrets in the description.

## Find and edit templates {#manage}

The Web list shows active templates by default. Filter by activity or part of the name. Page controls and page size are at the bottom. Opening a template and returning to the list preserves the page and filters in the URL.

Open a template to edit its description or activity. Deactivation and deletion require confirmation. Name and tag cannot be edited. To use another reference, register a new record. Deleting a record removes it only from Orpheus, leaving the AgentBox template intact.

The [list API](../reference/api/get-templates.md) accepts:

| Parameter | Meaning |
| --- | --- |
| `active` | `true` or `false`. Omit to return both states |
| `name` | Exact catalog name, including any team slug and tag, case-sensitive |
| `name_contains` | Literal substring, case-insensitive |
| `limit` | Page size, 1–200. Default 50 |
| `cursor` | A returned `next_cursor` or `prev_cursor`, with unchanged filters |

The two name filters cannot be combined. The response contains `items`, `next_cursor` and `prev_cursor`. Each page is ordered by name. Change a filter by starting from the first page. To check one stored selection, use `name` without an activity filter.

All SAML users and local anonymous users can manage templates. Browser writes follow the shared [Origin and CSRF rules](../operations/sso.md#template-writes). API keys also allow management.

## How activity affects sessions {#activity}

A new session requires an active catalog entry with the exact requested name. If the catalog stores `team/company-agent:stable`, neither `company-agent:stable` nor `team/company-agent` selects it. A missing or inactive entry returns HTTP `422 unknown_template`, with detail code `template_not_found` or `template_inactive`.

Accepted sessions keep their stored template name. Deactivation or deletion does not cancel queued work, change existing sandboxes or block continuation runs. Retrying an accepted request with its original idempotency key returns the accepted result regardless of later catalog changes.

Space keeps an inactive or deleted selection visible on the schedule. Saving other edits or resuming requires an active template. Pausing and deleting the schedule remain available.

## Environment changes

Updating an image does not change existing sandboxes. New sandboxes use the build selected by the template name and tag. If existing Mattermost conversations need the new environment, increment the workflow [`revision`](../reference/mattermost.md#workflow-revision) and [reload the workflow](../integrations/mattermost/reload.md). This starts a new session on the next request. A template or tool update alone does not require a revision change. In a [custom integration](../integrations/custom/overview.md), create a new session when you need to replace the existing sandbox.

With [`allow_multiple_runs: true`](../reference/api/create-session.md), files and context survive sandbox pauses between runs. In the default mode, the sandbox is deleted after its only run. Keep published results in the destination system.

[Template names](https://docs.agentbox.ru/en/templates/names/) · [Tags and versions](https://docs.agentbox.ru/en/templates/tags/)
