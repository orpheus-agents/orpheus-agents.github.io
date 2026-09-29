# Orpheus documentation

Bilingual documentation for the company AI agent platform, built with VitePress. It covers evaluation, deployment, agent configuration, Mattermost, custom integrations, web inspection and operations. The helpdesk guide demonstrates direct agent publication and Markdown delivery through `after_run`.

## Work locally

Requirements: Node.js 22+, Python 3.11+ and Docker Compose 2.24+. Python is used for example validation and the local static preview. Docker Compose is required by the configuration check. A running Docker daemon is only needed for `test:stack`.

```sh
npm ci
npm run dev
```

Open the URL printed by VitePress, then `/ru/` or `/en/`.

```sh
npm run check
npx playwright install chromium
npm run test:browser
npm run test:stack
```

- `check` verifies OpenAPI checksums and generated content, language parity, code blocks, request schemas, initializer behavior, hook publication, Compose configuration, production build, local links and anchors.
- `test:browser` checks both languages on desktop and mobile: navigation, theme, search, API links and language switching.
- `test:stack` starts an isolated, disposable PostgreSQL/API/web stack from the documented published images, validates the Mattermost workflow offline and verifies readiness and web proxying. It does not start a worker or call model providers, AgentBox or Mattermost. It removes its own containers and volume on exit.

To inspect the static build:

```sh
npm run build
npm run preview -- 4173
```

The preview binds to `127.0.0.1`. Production assets are in `docs/.vitepress/dist/`.

## Authoring

- `docs/ru/` and `docs/en/` have matching paths.
- `docs/.vitepress/pages.json` defines the reviewed guide order and translated navigation labels.
- `docs/.vitepress/theme/` extends VitePress with the Orpheus visual identity. Brand assets come from Orpheus Web. The bundled display font is distributed under its included SIL OFL license.
- `examples/quickstart/` contains the minimal runnable deployment.
- `examples/helpdesk/` contains short illustrative Python scripts, not a production connector. Adapt the hypothetical helpdesk API before use.
- `api/openapi.yaml` is the reviewed core contract. `api/upstream.json` records released revisions and its checksum. `api/translations.ru.json` translates contract descriptions. Literal JSON Schema retains the original contract.

Update both languages together. Use links to AgentBox for its own procedures. Keep public documentation focused on existing behavior and user tasks. Follow [AGENTS.md](AGENTS.md).

## Update the API reference

Read the contract from an explicit core release. Do not copy uncommitted work from neighboring repositories. Review the contract, image versions and examples together.

```sh
node scripts/sync-api.mjs ../orpheus v0.2.5
npm run api:generate
npm run check
```

The synchronization command exports a committed Git object and updates core provenance. Update the Russian description map when the contract gains descriptions. Update Compose image pins and related guide text deliberately when adopting another release. The generator fails on untranslated descriptions and the checks reject stale output.

## GitHub Pages

In repository **Settings → Pages → Build and deployment**, select **GitHub Actions**. The workflow builds and checks pull requests. A push to `main` publishes the checked static artifact at `https://orpheus-agents.github.io/`.

This repository includes publishing configuration. Creating files locally does not publish the site. Keep the VitePress base path `/` for this organization-site repository.

## Dependencies

VitePress is pinned to its stable release. The Vite override selects patched Vite 6.4.3, compatible with the bundled Vue plugin, instead of VitePress's vulnerable Vite 5 dependency. Validate builds, browser behavior and `npm audit` when updating either dependency.
