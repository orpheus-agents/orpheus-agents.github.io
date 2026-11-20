# Profiles and models

A profile selects an [LLM account](authentication.md), a model and shared instructions. Accounts and profiles are stored in PostgreSQL and managed through the web interface or [API](../reference/api/get-profiles.md). Connectors select a profile by its stable [`agent.profile`](../reference/api/create-session.md) name.

## Create a profile

1. In **Settings → LLM accounts**, add an account and configure its [authorization](authentication.md).
2. In **Settings → Profiles**, choose **Add profile**. Enter a unique name, select the account and specify the required model ID.
3. Add a description and instructions if needed. Keep the profile active.

The name is used in workflows and API requests and cannot be renamed. The model is a string identifier accepted by the selected account. A session can override it through [`agent.model`](../reference/api/create-session.md).

An OpenCode profile inherits its [provider](../reference/profiles.md#account-provider) from the account. For global Kimi Coding Plan, use a model ID such as `k3.1-pro`. For a Console account, enter `opencode-go/<model>` to use the Go subscription, for example `opencode-go/gpt-6-luna`. A bare model ID or `opencode/<model>` selects Console. Choose a [sandbox template](templates.md) that contains OpenCode.

Codex profiles support [`effort`](../reference/profiles.md#profile-codex-effort), [`summary`](../reference/profiles.md#profile-codex-summary), [`personality`](../reference/profiles.md#profile-codex-personality) and [`service_tier`](../reference/profiles.md#profile-codex-service-tier). Unset options are omitted when starting the agent. Model and account support determine which values the provider accepts.

## Manage profiles

The list supports search, activity filters and pagination. Open a profile to edit it, enable or disable it, or delete it. New sessions require both the profile and its account to be active. Disabling either does not stop accepted sessions.

To balance spending or quotas, select another account using the same harness. New sessions use the new account. Existing sessions retain their account and execution settings, including model and instructions. Changes take effect without restarting API or worker.

A deleted profile no longer admits new sessions. Existing sessions remain available. In [Mattermost](../integrations/mattermost/reload.md), use a deliberate workflow revision change to start new conversations with updated settings. In [Space](../space/schedules.md#pausing), reset reusable context when the next run should use a new session.

[`orpheus.toml`](../reference/profiles.md#store-access) contains credential-store infrastructure and [service definitions](secrets.md#services). Profiles and account credentials are managed in the database catalog.
