# LLM accounts and quotas

**Settings → LLM accounts** lists accounts as quota cards. Search by name, filter by activity and use pagination. Each card shows the account name, harness, authorization mode, activity and related profiles alongside all available quota windows, reset times and observation freshness.

Open a card to edit the name or authorization, enable or disable the account, or delete it. Deletion is blocked while a profile or session references the account. API keys appear only as masks. [Configure authorization](../configuration/authentication.md).

The provider and [authorization mode](../configuration/authentication.md) determine which quotas appear.

| Account | Quota windows |
| --- | --- |
| Codex with account authorization | Provider windows and the available reset count when reported |
| Global Kimi Coding Plan key (`kimi-code-plan-global`) | Five-hour, weekly, monthly coding and monthly total windows. The card shows each reported window and its reset time |
| OpenCode Console account with Go | Rolling five-hour, weekly and monthly windows when reported by the workspace |
| OpenCode Console workspace with credits only | A successful observation can have no windows. Monetary credits are outside the quota display |

Other API keys remain in the catalog without quota windows.

| State | Meaning |
| --- | --- |
| `fresh` | A current observation is available |
| `stale` | Saved data is outdated. Check observation time |
| `unknown` | No successful observation |
| `unavailable` | Data could not be obtained |

Use the observation state and timestamp to distinguish a missing measurement from a confirmed zero. Viewing the page reads saved observations and leaves paused sandboxes asleep.

An account is identified by [`account_id`](../reference/profiles.md#profile-auth-account-id). Usage percentages belong to provider quota windows. Check the window duration and reset time.

## Token breakdown

Input tokens include cached input. Output tokens include reasoning output. Do not add these subcategories to their totals again.

Account limits are observations and do not replace the [session budget](../configuration/limits.md). A missing fresh observation does not mean unlimited capacity.

[Account configuration](../configuration/authentication.md) · [Limits API](../reference/api/get-account-limits.md)
