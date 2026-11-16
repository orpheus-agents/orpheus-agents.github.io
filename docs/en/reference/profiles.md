# Profile and account reference

[Profiles](../configuration/profiles.md) and [LLM accounts](../configuration/authentication.md) are stored in the database. Manage them in Settings or through the [profile](api/get-profiles.md) and [account](api/get-llm-accounts.md) APIs.

| Profile field | Value |
| --- | --- |
| `name` | Required unique name. Immutable after creation |
| <span id="profile-harness"></span>`harness` | Inherited from the account. `codex` |
| `account_id` | Account UUID. Can be changed to another account of the same harness |
| <span id="profile-model"></span>`model` | Required model ID. A session can override it with [`agent.model`](api/create-session.md) |
| `description` | Optional description |
| `active` | Permits new sessions when the account is also active |
| <span id="profile-instructions"></span>`instructions` | Shared instructions. Replaced by [`agent.instructions`](api/create-session.md) |
| <span id="profile-codex-effort"></span>`codex.effort` | `none`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`, `ultra` |
| <span id="profile-codex-summary"></span>`codex.summary` | `auto`, `concise`, `detailed`, `none` |
| <span id="profile-codex-personality"></span>`codex.personality` | `none`, `friendly`, `pragmatic` |
| <span id="profile-codex-service-tier"></span>`codex.service_tier` | Optional nonblank provider service-tier name |

| Account field | Value |
| --- | --- |
| <span id="profile-auth-account-id"></span>`id` | Generated UUID. Identifies the account in sessions and quota observations |
| `name` | Editable display name |
| `harness` | Immutable. `codex` |
| <span id="profile-auth-mode"></span>`auth_mode` | Immutable. `api_key` or `account` |
| `active` | Permits new sessions through active profiles |
| <span id="profile-auth-store"></span>`credential_store` | Immutable store name for account-file authorization |
| `api_key` | Write-only provider key. Responses expose only `api_key_mask` |
| `auth_file` | Authorization JSON supplied when creating an account-file account. Edit through the [authorization-file API](api/replace-auth-file.md) |

API-key values are encrypted in the database. Account files are stored in S3. Runtime TOML contains only infrastructure such as credential stores and [services](../configuration/secrets.md#services).

## Credential store access {#store-access}

Supply S3 credentials to API and worker through `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. See [account authentication](../configuration/authentication.md#account) to prepare the store and authorization file.

| Credential store field | Value |
| --- | --- |
| <span id="store-type"></span>`type` | `s3` |
| <span id="store-bucket"></span>`bucket` | Bucket name |
| <span id="store-region"></span>`region` | Region, defaults to `us-east-1` |
| <span id="store-endpoint-url"></span>`endpoint_url` | Optional custom S3-compatible service URL |

Codex option support depends on the selected model and credentials. Orpheus captures settings when creating a session. The public API cannot override `codex.effort` or other `codex` options. Select an appropriate profile instead.

[Profile examples](../configuration/profiles.md) · [Authentication](../configuration/authentication.md)
