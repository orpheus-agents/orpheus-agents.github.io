# AGENTS.md

## Documentation guidelines

Write for administrators deploying Orpheus and developers integrating company systems. Also explain its value and deployment requirements to decision-makers discovering the platform.
Do not describe internal implementation details.
Explain the platform's capabilities and provide practical instructions for getting started quickly and configuring it further.

- Maintain documentation in Russian and English.
  Keep Russian and English pages equivalent, with matching paths under `docs/ru/` and `docs/en/`.
- Follow the principles of Maxim Ilyakhov's “Write, Cut” (Пиши, сокращай). Be concise but substantive.
- Prefer structured content, diagrams, and lists over walls of text.
- Document existing capabilities. Mention a limitation only when it helps the reader complete a task or
  avoid a mistake. Do not imply a roadmap with phrases such as “for now,” “not yet,”
  or similar qualifications. Mention future capabilities only when there is an explicitly
  agreed plan to announce them publicly.
- Describe current behavior without “since version” qualifications,
  historical comparisons, or migration instructions from older APIs.
- Split a thought into two sentences instead of using a semicolon.

## Example guidelines

- Support explanations with practical examples and brief descriptions that help readers understand the topic and take action.
- Link mentions of configuration files, environment variables and API fields to the relevant setup guide, reference entry or API operation in the same language. Preserve literal code examples and avoid links back to the definition being read.
- Prefer short Python examples that explain one integration step at a time.
- Link to AgentBox documentation for AgentBox-specific procedures. Explain how to use those capabilities in Orpheus here.

## Development

- Base documentation and runnable examples on the released revisions in `api/upstream.json`. Do not document uncommitted changes from neighboring repositories as released behavior.
- Run `npm run check` after changes. API pages are generated from the checked-in OpenAPI snapshot. Update them with `npm run api:generate`.
