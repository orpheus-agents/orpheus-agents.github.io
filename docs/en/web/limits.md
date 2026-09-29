# Tokens and account limits

The limits page shows quotas for accounts used by profiles with [`mode = "account"`](../configuration/authentication.md#account). API-key quotas are not listed.

| State | Meaning |
| --- | --- |
| `fresh` | A current observation is available |
| `stale` | Saved data is outdated. Check observation time |
| `unknown` | No successful observation |
| `unavailable` | Data could not be obtained |

Missing data does not mean zero usage. Updates come from running sessions using the account. Viewing the page does not wake a paused sandbox.

Profiles sharing an account are grouped by [`account_id`](../reference/profiles.md#profile-auth-account-id). Usage percentages belong to provider quota windows. Check the window duration and reset time.

## Token breakdown

Input tokens include cached input. Output tokens include reasoning output. Do not add these subcategories to their totals again.

Account limits are observations and do not replace the [session budget](../configuration/limits.md). A missing fresh observation does not mean unlimited capacity.

[Account configuration](../configuration/authentication.md) · [Limits API](../reference/api/get-account-limits.md)
