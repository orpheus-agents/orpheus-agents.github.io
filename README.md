<p align="center">
  <a href="https://orpheus-agents.github.io/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset=".github/orpheus-logo.svg">
      <img src=".github/orpheus-logo-light.svg" alt="Orpheus" width="240">
    </picture>
  </a>
</p>

# Orpheus documentation

Bilingual documentation for the company AI agent platform, built with VitePress. It covers evaluation, deployment, agent configuration, Mattermost, custom integrations, web inspection, Space schedules and operations. The helpdesk guide demonstrates direct agent publication and Markdown delivery through `after_run`.

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
- `test:browser` checks both languages on desktop and mobile: the project site and its interactive sections, navigation, theme, search, API links and language switching.
- `test:stack` starts isolated, disposable Orpheus and Space PostgreSQL/API/web stacks from the documented published images. It validates the Mattermost workflow offline and verifies readiness, web proxying, Space CRUD and browser-write protection. It checks the local connection with a Space worker and confirms submission to Orpheus. It does not start the Orpheus worker or call model providers, AgentBox or Mattermost. It removes its own containers and volumes on exit.

To inspect the static build:

```sh
npm run build
npm run preview -- 4173
```

The preview binds to `127.0.0.1`. Production assets are in `docs/.vitepress/dist/`.

## Authoring

- `docs/ru/` and `docs/en/` have matching paths.
- `docs/.vitepress/pages.json` defines the reviewed guide order and translated navigation labels.
- `docs/.vitepress/theme/` extends VitePress with the Orpheus visual identity. Brand assets come from Orpheus Web. The bundled fonts are distributed under their included SIL OFL licenses.
- `docs/.vitepress/theme/home/` is the project site shown on the home pages. See [Project site](#project-site).
- `examples/quickstart/` contains the minimal runnable deployment.
- `examples/space/` contains a separate Space deployment and a paused schedule payload.
- `examples/helpdesk/` contains short illustrative Python scripts, not a production connector. Adapt the hypothetical helpdesk API before use.
- `api/openapi.yaml` and `api/space.openapi.yaml` are the reviewed Orpheus and Space contracts. `api/upstream.json` records released revisions and checksums. The corresponding `translations.ru.json` and `space.translations.ru.json` translate descriptions. Literal JSON Schema retains the original contracts.

Update both languages together. Use links to AgentBox for its own procedures. Keep public documentation focused on existing behavior and user tasks. Follow [AGENTS.md](AGENTS.md).

## Project site

The home pages `/`, `/ru/` and `/en/` present Orpheus as a project site. `/` shows the English version with a link to the Russian one. Sections follow the guide and link to its pages.

| Section | Component | Content |
| --- | --- | --- |
| First screen | `HomeHero.vue` | Title, actions and the strings field with the relief of the mark |
| The path of a task | `HomeFlow.vue`, `flow.ts` | Score of a task for five use cases with a thread and an agent console. The last one starts from a schedule in Orpheus Space |
| Recurring work | `HomeSpace.vue`, `space.ts` | A week of example schedules in Orpheus Space: runs by day and the latest answers |
| Connect your systems | `HomeSystems.vue`, `systems.ts` | Systems by group with the ready way to connect, and the HTTP API for any other system |
| Web interface | `HomeObserve.vue`, `observe.ts` | Session, analytics and limits with example data |
| Deployment | `HomeDeploy.vue`, `deploy.ts` | Pilot requirements and links to deployment guides |
| Case | `HomeCase.vue`, `case.ts` | RetailCRM results with a chart by week and a quote |
| Final screen | `HomeStart.vue` | Documentation and deployment help actions, guide paths and the footer |

- Texts of both languages live next to each other in the `*.ts` files of a section. Update them together.
- Scenario steps, commands and API fields must match the guide and `api/openapi.yaml`.
- `strings.ts` draws the strings field on a canvas. Motion runs only on screen and stops when the visitor prefers reduced motion. The score then shows the finished task.
- The week of schedules is an illustration, not a copy of a Space screen. Its runs fill in once when the board comes into view. The word “Space” next to the logo is set in Besley Italic, as in Orpheus Space Web.
- The page follows the Orpheus interface guide from Orpheus Web: ink, paper and one accent, sharp corners, 1 px rules. Consoles are dark in both themes.

### Logos

Logos are black SVG files in `docs/public/brand/systems/`. The dark theme inverts them. Every logo belongs to its owner.

| Files | Source |
| --- | --- |
| `systems/telegram.svg`, `mattermost.svg`, `redmine.svg`, `gitlab.svg`, `github.svg`, `sentry.svg`, `grafana.svg` | [Simple Icons](https://simpleicons.org), CC0 |
| `systems/retailcrm.svg` | Official black icon of RetailCRM, unchanged |
| `systems/yandex-tracker.svg`, `systems/yandex-messenger.svg` | One-colour icons from the [Yandex 360 brand system](https://360.yandex.ru/brand/), converted from PDF |
| `systems/bitrix24.svg` | Icon of [bitrix24.ru](https://www.bitrix24.ru/), in one colour |
| `systems/amocrm.svg` | Square logo from the press materials of [amocrm.ru](https://www.amocrm.ru/), in one colour |
| `systems/1c.svg` | Logo of [1c.ru](https://1c.ru/), in one colour |
| `systems/yclients.svg` | Compact logo from the [YCLIENTS brand page](https://partners.yclients.com/brand), in one colour |
| `systems/max.svg` | Sign of the product, in one colour |

Every system has a logo. Add the file for a new system and set `logo` in `systems.ts`.

### Case

Numbers and the quote of the RetailCRM case come from the post [t.me/dev_salikhov/52](https://t.me/dev_salikhov/52). `case.ts` keeps the requests and the average time by week. The chart shows the trend without numbers. The photo of the author is `docs/public/brand/people/ilyas-salikhov.jpg`.

### Link previews

Every page carries Open Graph and Twitter tags with its title, description and address. `transformHead` in `docs/.vitepress/config.mts` adds them at build time. Russian pages use `docs/public/og-ru.png`, other pages use `docs/public/og-en.png`. The root page shows the English site, but its preview is Russian: the card, the title and the description come from the Russian home page.

The cards are 1200 by 630 pixels. They repeat the first screen: the title on a sheet of strings with the relief of the mark. `scripts/og.mjs` draws them with the strings engine of the site. Redraw the cards after the first screen, the fonts or the logo change:

```sh
npm run og
```

### Ways to connect

Every system in `systems.ts` carries a label with the ready way to connect. Check the source before changing a label.

| Label | Systems | Source |
| --- | --- | --- |
| Ready-made connector | Mattermost | [orpheus-mattermost](https://github.com/orpheus-agents/orpheus-mattermost) |
| CLI | Redmine | [muxx/redmine-cli](https://github.com/muxx/redmine-cli) |
| CLI and MCP | GitLab | [glab](https://docs.gitlab.com/cli/), [GitLab MCP server](https://docs.gitlab.com/user/model_context_protocol/mcp_server/) |
| CLI and MCP | GitHub | [gh](https://cli.github.com), [github-mcp-server](https://github.com/github/github-mcp-server) |
| CLI and MCP | Sentry | [sentry-cli](https://docs.sentry.io/cli/), [Sentry MCP](https://docs.sentry.io/product/mcp-servers/getting-started/) |
| MCP | Grafana | [mcp-grafana](https://github.com/grafana/mcp-grafana) |
| MCP | Bitrix24 | [Bitrix24 MCP](https://mcp.bitrix24.ru/) |
| MCP | Yandex Tracker | [MCP Hub templates of Yandex AI Studio](https://aistudio.yandex.ru/docs/ru/ai-studio/concepts/mcp-hub/templates.html) |
| Community MCP | RetailCRM, amoCRM, 1C, YCLIENTS | Servers by community authors. The vendors publish none |
| Bot API | Telegram, Yandex Messenger, MAX | [Telegram](https://core.telegram.org/bots/api), [Yandex Messenger](https://yandex.ru/dev/messenger/doc/ru/), [MAX](https://dev.max.ru/docs-api) |

## Update the API reference

Read each contract from an explicit Orpheus or Space release. Do not copy uncommitted work from neighboring repositories. Review the contract, image versions and examples together.

```sh
node scripts/sync-api.mjs ../orpheus v0.6.0
node scripts/sync-api.mjs ../orpheus-space v0.10.0 orpheus-space
npm run api:generate
npm run check
```

The synchronization command exports a committed Git object and updates the selected component’s provenance. Update the Russian description map when the contract gains descriptions. Update Compose image pins and related guide text deliberately when adopting another release. The generator fails on untranslated descriptions and the checks reject stale output.

## GitHub Pages

In repository **Settings → Pages → Build and deployment**, select **GitHub Actions**. The workflow builds and checks pull requests. A push to `main` publishes the checked static artifact at `https://orpheus-agents.github.io/`.

This repository includes publishing configuration. Creating files locally does not publish the site. Keep the VitePress base path `/` for this organization-site repository.

## Dependencies

VitePress is pinned to its stable release. The Vite override selects patched Vite 6.4.3, compatible with the bundled Vue plugin, instead of VitePress's vulnerable Vite 5 dependency. Validate builds, browser behavior and `npm audit` when updating either dependency.
