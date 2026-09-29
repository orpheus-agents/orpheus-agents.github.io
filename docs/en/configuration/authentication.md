# Agent authentication

Choose authentication separately for each profile in [`orpheus.toml`](profiles.md). Add the examples below to this file.

## API key

```toml
[profiles.default.auth]
mode = "api_key"
api_key_env = "OPENAI_API_KEY"
```

Supply [`OPENAI_API_KEY`](../reference/environment.md#env-openai-api-key) to the worker process. The field holds a variable name, not the key itself. Do not add the model key to [`sandbox.env_from`](../reference/api/create-session.md). Orpheus configures model authentication separately.

## Account

Upload a valid Codex `auth.json` to a private S3-compatible bucket. Use credentials for the account assigned to this installation.

```toml
[credential_stores.main]
type = "s3"
bucket = "orpheus-credentials"
region = "us-east-1"

[profiles.team]
harness = "codex"
model = "gpt-6-sol"
[profiles.team.auth]
mode = "account"
account_id = "support-team"
store = "main"
key = "codex/support/auth.json"
```

For a custom S3 service, set the store's [`endpoint_url`](../reference/profiles.md#store-endpoint-url). Supply worker access through standard AWS credentials such as [`AWS_ACCESS_KEY_ID`](../reference/profiles.md#store-access) and [`AWS_SECRET_ACCESS_KEY`](../reference/profiles.md#store-access). Update the authorization file when credentials change.

Profiles sharing an account must use the same [`account_id`](../reference/profiles.md#profile-auth-account-id) and credential source. The ID appears in [account limits](../web/limits.md). Assign a new ID when replacing the underlying account.
