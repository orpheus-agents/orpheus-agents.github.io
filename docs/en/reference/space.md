# Space configuration

Space reads process environment and the access and execution TOML file at startup. The binary does not load `.env`. Compose reads it in the [deployment example](../space/setup.md). Restart the relevant processes after changing settings.

## Service and database {#service}

| Variable | Default | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Required | Separate Space PostgreSQL DSN. Shared by API, worker and migrations |
| `ORPHEUS_CONFIG_FILE` | `orpheus-space.toml` | Access and execution TOML path for API and worker |
| `ORPHEUS_MIGRATIONS_DIR` | `migrations` | Image migration directory |
| `ORPHEUS_HOST`, `ORPHEUS_PORT` | `0.0.0.0`, `8000` | Public API listener |
| `ORPHEUS_SYSTEM_HOST`, `ORPHEUS_SYSTEM_PORT` | `0.0.0.0`, `9100` | Each process's system listener |
| `WORKER_POLL_SECONDS` | `1` | Positive worker polling interval in seconds, fractions allowed |
| `MAX_REQUEST_BYTES` | `1048576` | Request body limit, from 4096 to 1048576 bytes |

All [services in the Orpheus catalog](../configuration/secrets.md#services) are available to users who can edit a schedule. Supply secret values to the Orpheus worker. Space stores only the selected service codes.

## Orpheus connection {#core}

| Variable | Purpose |
| --- | --- |
| `ORPHEUS_BASE_URL` | HTTP(S) Orpheus origin reachable from Space, without `/api/v1` |
| `ORPHEUS_API_KEY` | Orpheus Bearer key for dispatch, status polling and result retrieval |

Both are required by the worker. The API also uses them for the profile/template/service catalogs, schedule creation, selection validation and result retrieval. These operations return `503` when Orpheus is unavailable. Unchanged service selections and clearing all services do not require that catalog. Give Space a separate key from [Orpheus's `PUBLIC_API_KEYS`](environment.md#env-public-api-keys). It differs from the key used by the CLI to access Space.

## Space access {#access}

| Variable | Default | Purpose |
| --- | --- | --- |
| `PUBLIC_API_KEYS` | `[]` | JSON array of Space Bearer keys. Must be nonempty in `api_only` mode |
| `ORPHEUS_BROWSER_AUTH` | `api_only` | `api_only`, `anonymous` or `saml` |
| `ORPHEUS_PUBLIC_URL` | None | Exact external browser origin without trailing slash. Required in `anonymous` and `saml`, HTTPS only for SAML |

The API also uses `ORPHEUS_PUBLIC_URL` for the [schedule’s `url` field](space-api/schema-schedule.md), a link to its Space Web card. Without this setting, `url` is `null`. The link is computed when responding, so changing the address does not require editing schedules. Request addresses and proxy headers are not used to build it.

The TOML field `access.admin_emails` contains SAML administrator emails:

```toml
[access]
admin_emails = ["admin@example.com"]
```

The default is `[]`: no SAML administrators. Addresses are trimmed and lowercased. Invalid addresses and duplicates after normalization prevent startup. Restart the API after changes. Current sessions acquire the new role on their next request. API keys and anonymous mode retain full access.

See [permissions, Origin and CSRF](../space/access.md). The worker validates the mode name but does not use browser settings or SAML files.

## API SAML settings {#saml}

| Variable | Purpose |
| --- | --- |
| `SAML_SP_ENTITY_ID` | Entity ID of the separate Space client |
| `SAML_IDP_METADATA_FILE` | IdP metadata XML path |
| `SAML_SP_CERT_FILE` | SP certificate path |
| `SAML_SP_KEY_FILE` | SP private-key path |
| `BROWSER_SESSION_TTL_SECONDS` | Browser session lifetime. Default 43200 seconds, range 300–86400 |

The first four settings are required in `saml` mode. API reads files at startup. See [SSO setup](../space/access.md).

## Base execution TOML {#execution}

```toml
[execution.agent]
profile = "default"
instructions_file = "/etc/orpheus-space/instructions.md"

[execution.sandbox]
template = "codex"

[execution.limits]
run_timeout_seconds = 3600
max_session_tokens = 1000000
```

| Field | Purpose |
| --- | --- |
| `execution.agent.profile` | Required default [Orpheus profile](../configuration/profiles.md) for new schedules |
| `execution.agent.instructions` | Optional inline instructions. An empty string clears profile instructions |
| `execution.agent.instructions_file` | Alternative UTF-8 instructions file, mounted in API and worker |
| `execution.sandbox.template` | Required default [AgentBox template](../configuration/templates.md) for new schedules |
| `execution.limits.run_timeout_seconds` | Positive run timeout. Default 3600 seconds |
| `execution.limits.max_session_tokens` | Optional positive session token limit |

`instructions` and `instructions_file` are mutually exclusive. Omitting both preserves Orpheus profile instructions. Space accepts only the TOML fields listed here.

Changing the effective base configuration starts fresh context on the next execution of a reusable-session schedule.

## Select services {#environment}

1. Define a [service](../configuration/secrets.md#services) in the Orpheus catalog.
2. Supply its ENV values to the **Orpheus worker**.
3. Select its code in the schedule's [`services`](space-api/schema-createschedule.md).

There are no default services or ENV lists in Space configuration. An omitted selection on creation is `[]`. An empty selection removes all selected services. Unknown codes return `422`. Catalog failures return `503` when validation is needed. Unchanged selections and clearing services can be saved without catalog access. Resuming a paused schedule validates its complete selection.

The root [services](space-api/get-services.md), [profiles](space-api/get-profiles.md) and [templates](space-api/get-templates.md) endpoints return `{items: [...]}`. The [schedule settings endpoint](space-api/get-settings.md) returns only `browser_auth`.

## Web interface {#web}

`ORPHEUS_SPACE_UPSTREAM` in the Space Web image sets the internal Space API origin, for example `http://space-api:8000`. Nginx proxies API and authentication routes there. Configure the public browser origin on API through `ORPHEUS_PUBLIC_URL`.

## CLI {#cli}

| Variable | Purpose |
| --- | --- |
| `ORPHEUS_SPACE_HOST` | Public Space origin without `/api/v1` |
| `ORPHEUS_SPACE_API_KEY` | A key from Space's `PUBLIC_API_KEYS` |

`--host` overrides only the address. The key is accepted only from environment. See [installation and commands](../space/cli.md).
