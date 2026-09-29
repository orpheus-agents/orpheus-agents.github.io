# Profiles and models

A profile defines the model, authentication and shared instructions. You choose profile names. Connectors select one through [`agent.profile`](../reference/api/create-session.md).

Define profiles in the Orpheus configuration file, [`orpheus.toml`](../reference/profiles.md). In the [quick start](../getting-started/launch.md), this file is in `examples/quickstart/`, next to [`compose.yaml`](../getting-started/launch.md).

```toml
[profiles.default]
harness = "codex"
model = "gpt-5.6-terra"
[profiles.default.auth]
mode = "api_key"
api_key_env = "OPENAI_API_KEY"

[profiles.deep-analysis]
harness = "codex"
model = "gpt-5.6-sol"
[profiles.deep-analysis.codex]
effort = "xhigh"
[profiles.deep-analysis.auth]
mode = "api_key"
api_key_env = "OPENAI_API_KEY"
```

This example assigns Terra to general work and Sol with `xhigh` to a dedicated channel. Replace model identifiers with those available to your credentials.

Set [`effort`](../reference/profiles.md#profile-codex-effort), [`summary`](../reference/profiles.md#profile-codex-summary), [`personality`](../reference/profiles.md#profile-codex-personality) and [`service_tier`](../reference/profiles.md#profile-codex-service-tier) for the relevant profile in [`orpheus.toml`](../reference/profiles.md). Orpheus omits unspecified parameters when starting the agent. An empty string is not equivalent to omission.

After editing [`orpheus.toml`](../reference/profiles.md), recreate API and worker with the same configuration. Existing sessions retain their settings. For Mattermost, increase the workflow [`revision`](../reference/mattermost.md#workflow-revision) so the next request creates a new session.

[Profile reference](../reference/profiles.md) · [Channel routing example](../integrations/mattermost/channels.md)
