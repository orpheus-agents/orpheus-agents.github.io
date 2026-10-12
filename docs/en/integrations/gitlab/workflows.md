# Review rules and projects

Each Markdown file at the root of [`WORKFLOWS_DIR`](../../reference/gitlab-review.md#env-workflows-dir) defines a workflow. YAML front matter selects projects and execution settings. The Markdown body contains review instructions.

## Select projects

```markdown
---
id: backend-review
project_ids: [123, 456]
profile: review
sandbox_template: gitlab-review
services: [gitlab]
language: en
---

# Review rules

Check correctness, access control and changes to public contracts.
Read the project instructions and run relevant available checks.
Report actionable problems introduced by this change with file and line references.
Explain any required check that could not be completed.
```

Replace the example IDs and names with your configuration. [`services`](../../reference/gitlab-review.md#workflow-services) is required. Use `services: []` when your template already provides all necessary access. No service is selected implicitly.

Use [`project_ids`](../../reference/gitlab-review.md#workflow-project-ids) for project-specific rules. Omit the field in one workflow to cover all remaining projects accessible to the bot. An explicit route takes precedence over this fallback. Each project can belong to only one explicit route.

A fallback is optional. If an assigned MR matches no workflow, the connector posts a skip note, removes only itself from reviewers and does not start an agent.

## Write the policy

The Markdown body replaces the [profile instructions](../../reference/profiles.md#profile-instructions). Include all review rules the agent needs: required checks, sources of requirements and how to assess earlier findings. The connector supplies the MR context and instructions for producing review results.

The agent analyzes the selected MR diff in a prepared checkout. GitLab publication is handled by the connector. Do not instruct the agent to publish comments, approve the MR or switch to a newer branch revision.

[`language`](../../reference/gitlab-review.md#workflow-language) sets the language of agent-authored text. It does not translate the connector's completion, failure or skip messages. The defaults are English.

## Customize completion and failure notes

Add [`notes`](../../reference/gitlab-review.md#workflow-notes) to the YAML front matter:

```yaml
notes:
  success: "✅ Review completed. Confirmed findings: {{ .FindingsCount }}."
  fail: |
    ⚠️ Review could not be completed: {{ .Reason }}.

    Orpheus session: {{ .SessionURL }}
```

Each template replaces the entire visible note, including links and emoji. Write it in the language you want to publish. Only the three [documented placeholders](../../reference/gitlab-review.md#note-placeholders) are supported. Keep meaningful text around optional values such as the session URL. The unmatched-project skip note stays English.

## Apply changes

Restart the connector after editing workflow files. In the [Compose example](connect.md):

```sh
docker compose restart review
docker compose logs --tail=100 review
```

Invalid files, duplicate IDs, overlapping routes or an empty workflow directory prevent the entire connector from starting. See the [validation rules](../../reference/gitlab-review.md#validation).

Accepted reviews retain their original settings and notes even if the workflow changes or is removed. Editing files does not start another review. Assign the bot again after the current review finishes to use the new rules.
