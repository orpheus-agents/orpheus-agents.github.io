# Profile reference

Define profiles in the Orpheus configuration file, [`orpheus.toml`](../configuration/profiles.md). In the [quick start](../getting-started/launch.md), this file is in `examples/quickstart/`, next to [`compose.yaml`](../getting-started/launch.md).

Each profile has a `[profiles.<name>]` table in this file. Add credential store settings in `[credential_stores.<name>]` tables when needed.

| Profile field | Value |
| --- | --- |
| <span id="profile-harness"></span>`harness` | `codex` |
| <span id="profile-model"></span>`model` | Model ID. Can be supplied through API [`agent.model`](api/create-session.md) |
| <span id="profile-instructions"></span>`instructions` | Shared instructions. Replaced by [`agent.instructions`](api/create-session.md) |
| <span id="profile-codex-effort"></span>`codex.effort` | `none`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`, `ultra` |
| <span id="profile-codex-summary"></span>`codex.summary` | `auto`, `concise`, `detailed`, `none` |
| <span id="profile-codex-personality"></span>`codex.personality` | `none`, `friendly`, `pragmatic` |
| <span id="profile-codex-service-tier"></span>`codex.service_tier` | Nonblank provider service-tier name |
| <span id="profile-auth-mode"></span>`auth.mode` | `api_key` or `account` |
| <span id="profile-auth-api-key-env"></span>`auth.api_key_env` | Key environment variable name. Only for `api_key` |
| <span id="profile-auth-account-id"></span>`auth.account_id` | Stable account ID. Only for `account` |
| <span id="profile-auth-store"></span>`auth.store` | Credential store name. Only for `account` |
| <span id="profile-auth-key"></span>`auth.key` | Stored [`auth.json`](../configuration/authentication.md#account) object key. Only for `account` |

## Credential store access {#store-access}

Supply S3 credentials to the worker through `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. See [account authentication](../configuration/authentication.md#account) to prepare the store and authorization file.

| Credential store field | Value |
| --- | --- |
| <span id="store-type"></span>`type` | `s3` |
| <span id="store-bucket"></span>`bucket` | Bucket name |
| <span id="store-region"></span>`region` | Region, defaults to `us-east-1` |
| <span id="store-endpoint-url"></span>`endpoint_url` | Optional custom S3-compatible service URL |

Codex option support depends on the selected model and credentials. Orpheus captures settings when creating a session. The public API cannot override `codex.effort` or other `codex` options. Select an appropriate profile instead.

[Profile examples](../configuration/profiles.md) · [Authentication](../configuration/authentication.md)
