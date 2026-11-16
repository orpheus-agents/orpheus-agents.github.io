# LLM accounts and quotas

**Settings → LLM accounts** lists accounts as quota cards. Search by name, filter by activity and use pagination. Each card shows the account name, harness, authorization mode, activity and related profiles alongside all available quota windows, reset times and observation freshness.

Open a card to edit the name or authorization, enable or disable the account, or delete it. Deletion is blocked while a profile or session references the account. API keys appear only as masks. [Configure authorization](../configuration/authentication.md).

Provider quota observations are available for account-file authorization. API-key accounts remain in the list without these quotas. A failed request is shown separately from a successful response with no observation.

| State | Meaning |
| --- | --- |
| `fresh` | A current observation is available |
| `stale` | Saved data is outdated. Check observation time |
| `unknown` | No successful observation |
| `unavailable` | Data could not be obtained |

Missing data does not mean zero usage. Updates come from running sessions using the account. Viewing the page does not wake a paused sandbox.

An account is identified by [`account_id`](../reference/profiles.md#profile-auth-account-id). Usage percentages belong to provider quota windows. Check the window duration and reset time.

## Token breakdown

Input tokens include cached input. Output tokens include reasoning output. Do not add these subcategories to their totals again.

Account limits are observations and do not replace the [session budget](../configuration/limits.md). A missing fresh observation does not mean unlimited capacity.

[Account configuration](../configuration/authentication.md) · [Limits API](../reference/api/get-account-limits.md)
