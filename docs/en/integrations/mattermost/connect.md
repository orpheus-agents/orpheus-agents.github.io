# Connect a bot

The connector maps Mattermost threads to Orpheus sessions and returns messages and files to the original thread.

## Create the bot

1. Enable bot account creation in Mattermost integration settings.
2. Open Integrations → Bot Accounts and create a bot with a recognizable username, such as `orpheus`.
3. Save the generated token in [`.env`](../../getting-started/launch.md#fill-in-the-settings) as `MATTERMOST_BOT_TOKEN`.
4. Add the bot to the relevant team and channels.
5. Set the Mattermost address and token variable name in the workflow.

```yaml
mattermost:
  base_url: https://chat.example.com
  token_env: MATTERMOST_BOT_TOKEN
```

Supply the token to both connector and worker. Include `MATTERMOST_BOT_TOKEN` in a [service definition](../../configuration/secrets.md#services) or [`HARNESS_ENV_ALLOWLIST`](../../reference/environment.md#env-harness-env-allowlist) on API and worker because file hooks use it. The quick-start catalog already defines this name.

The quick-start service can also be selected in Space, granting that agent the bot token's read and post permissions. To keep the token out of service selectors, keep its name in `HARNESS_ENV_ALLOWLIST` and omit it from the catalog. This does not limit trusted API clients or workflows that explicitly select ENV names. See [request scopes](../../configuration/secrets.md#hook-secrets).

The connector discovers the bot ID and username from its token. Workflows sharing a bot must use the same token variable name. Different bots can have independent workflow sets.

Check with `docker compose run --rm --no-deps mattermost validate`, then start the connector and request [`/readyz`](../../operations/monitoring.md). Validation checks local configuration. Startup checks server connectivity and credentials.

[Mattermost bot accounts](https://developers.mattermost.com/integrate/reference/bot-accounts/) · [Quick start](../../getting-started/mattermost.md)
