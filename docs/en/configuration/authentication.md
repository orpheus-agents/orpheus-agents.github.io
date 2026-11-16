# Agent authentication

Create authorization in **Settings → LLM accounts**. Set a name, harness and authorization mode, then select this account in one or more [profiles](profiles.md). The mode and credential store cannot be changed after creation. Create another account and rebind profiles if you need a different mode.

## API key

Choose **API key** and enter the provider key. Orpheus encrypts it in the database using [`ENV_ENCRYPTION_KEY`](../reference/environment.md#env-env-encryption-key). API and worker must share this key. Provider keys do not belong in the runtime environment or [`sandbox.env_from`](../reference/api/create-session.md).

The account card shows a mask. Enter a new key to replace it. The old key is never returned by the API or filled into the replacement field.

## Account

Configure a private S3-compatible store in [`orpheus.toml`](../reference/profiles.md#store-access):

```toml
[credential_stores.main]
type = "s3"
bucket = "orpheus-credentials"
region = "us-east-1"
```

For a custom service, set [`endpoint_url`](../reference/profiles.md#store-endpoint-url). Supply **both API and worker** with standard AWS credentials such as [`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`](../reference/profiles.md#store-access). Grant read and write access to authorization objects. The service must return `ETag` and support conditional writes with `If-Match`.

Choose **Account**, select the store and paste valid Codex `auth.json` content into the form. Orpheus generates the object name from the account UUID. Profiles using the same account share this authorization.

Open **Edit authorization** to load or replace the file. This action reveals its tokens to the current user. A conflicting change keeps your draft and requires an explicit reload before saving again. Unknown JSON fields are preserved.

Orpheus synchronizes refreshed tokens back to S3. A replacement agent process reads the current file. A process that is already running does not automatically reload a manual replacement. The account identity in existing sessions stays fixed when a profile is moved to another account.

You can delete an account only when no profile or session references it. Deletion removes its database record and API-key secret, but leaves its S3 file. [Account cards and quotas](../web/limits.md).

## Network proxy {#network-proxy}

[`SANDBOX_PROXY_URL`](../reference/environment.md#env-sandbox-proxy-url) configures the agent process proxy. HTTP and HTTPS URLs populate `HTTP_PROXY` and `HTTPS_PROXY`. SOCKS5 and SOCKS5H URLs populate `ALL_PROXY`. `NO_PROXY` keeps `localhost` and `127.0.0.1` direct. An empty setting disables Orpheus proxy injection.

The default is AgentBox's HTTPS proxy. For SOCKS5 with proxy-side DNS resolution, use `socks5h://sandbox-proxy.agentbox.ru:65180`. SOCKS support depends on the installed harness and its authentication mode. Keep HTTPS for ChatGPT account authentication unless you have verified that combination: in a compatibility check, Codex 0.164.0 worked with an API key over SOCKS5, but account authentication failed with `workspace routing discovery failed`.
