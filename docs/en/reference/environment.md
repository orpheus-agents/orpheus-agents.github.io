# Orpheus configuration

Process settings are supplied through ENV. The application does not load [`.env`](../getting-started/launch.md#fill-in-the-settings) itself. Compose does. The `serve` command flags take precedence for listener addresses.

| Variable | Default | Purpose |
| --- | --- | --- |
| <span id="env-database-url"></span>`DATABASE_URL` | `required` | PostgreSQL for API, worker and migrations |
| <span id="env-orpheus-config-file"></span>`ORPHEUS_CONFIG_FILE` | [`orpheus.toml`](../configuration/profiles.md) | Profile TOML path |
| <span id="env-orpheus-migrations-dir"></span>`ORPHEUS_MIGRATIONS_DIR` | `migrations` | Migration directory. The --dir flag takes precedence |
| <span id="env-public-api-keys"></span>`PUBLIC_API_KEYS` | `[]` | JSON array of Bearer keys with equal access |
| <span id="env-env-encryption-key"></span>`ENV_ENCRYPTION_KEY` | `required` | 32-byte base64url key for environment encryption |
| <span id="env-harness-env-allowlist"></span>`HARNESS_ENV_ALLOWLIST` | `[]` | JSON array of selectable worker ENV names |
| <span id="env-agentbox-api-key"></span>`AGENTBOX_API_KEY` | `required on worker` | Worker access to AgentBox |
| <span id="env-openai-api-key"></span>`OPENAI_API_KEY` | `profile-dependent` | Model key for the example API-key profile |
| <span id="env-sandbox-proxy-url"></span>`SANDBOX_PROXY_URL` | `https://sandbox-proxy.agentbox.ru:65181` | Agent HTTP(S) proxy. Empty disables injection |
| <span id="env-max-concurrent-sessions"></span>`MAX_CONCURRENT_SESSIONS` | `50` | Occupied execution slots, including preparation and finalization |
| <span id="env-default-max-session-tokens"></span>`DEFAULT_MAX_SESSION_TOKENS` | `100000000` | Default token budget for new sessions |
| <span id="env-max-tool-result-bytes"></span>`MAX_TOOL_RESULT_BYTES` | `524288` | Retained tool output bytes |
| <span id="env-max-hook-output-bytes"></span>`MAX_HOOK_OUTPUT_BYTES` | `524288` | Retained hook stdout/stderr bytes |
| <span id="env-max-request-bytes"></span>`MAX_REQUEST_BYTES` | `1048576` | API request body limit in bytes |
| <span id="env-database-ping-timeout"></span>`DATABASE_PING_TIMEOUT` | `2` | Database probe timeout, seconds |
| <span id="env-cancel-grace-seconds"></span>`CANCEL_GRACE_SECONDS` | `30` | Graceful cancellation wait, seconds |
| <span id="env-worker-poll-seconds"></span>`WORKER_POLL_SECONDS` | `1` | Worker polling interval, seconds |
| <span id="env-rpc-timeout-seconds"></span>`RPC_TIMEOUT_SECONDS` | `30` | Individual agent RPC timeout, seconds |
| <span id="env-orpheus-host"></span><span id="env-orpheus-port"></span>`ORPHEUS_HOST / ORPHEUS_PORT` | `0.0.0.0 / 8000` | API listener |
| <span id="env-orpheus-system-host"></span><span id="env-orpheus-system-port"></span>`ORPHEUS_SYSTEM_HOST / ORPHEUS_SYSTEM_PORT` | `0.0.0.0 / 9100` | Process probes and [service metrics](../operations/monitoring.md#service-metrics). Keep access within a trusted network |
| <span id="env-orpheus-browser-auth"></span>`ORPHEUS_BROWSER_AUTH` | `api_only` | api_only, anonymous or saml |
| <span id="env-orpheus-public-url"></span>`ORPHEUS_PUBLIC_URL` | `unset` | External origin. HTTPS required for SAML |
| <span id="env-saml-sp-entity-id"></span>`SAML_SP_ENTITY_ID` | `unset` | SP entity ID |
| <span id="env-saml-idp-metadata-file"></span>`SAML_IDP_METADATA_FILE` | `unset` | Path to IdP metadata XML |
| <span id="env-saml-sp-cert-file"></span>`SAML_SP_CERT_FILE` | `unset` | Path to SP certificate |
| <span id="env-saml-sp-key-file"></span>`SAML_SP_KEY_FILE` | `unset` | Path to SP private key |
| <span id="env-browser-session-ttl-seconds"></span>`BROWSER_SESSION_TTL_SECONDS` | `43200` | Browser session lifetime, 300-86400 seconds |

`required` marks a required value. `unset` means no value is configured. SAML fields are required in `saml` mode. Add integration variables such as [`HELPDESK_TOKEN`](../configuration/secrets.md) to worker environment and the allowlist.

API and worker must share profile configuration, allowed environment names and encryption key. Recreate containers after ENV changes. [Practical setup](../configuration/secrets.md).
