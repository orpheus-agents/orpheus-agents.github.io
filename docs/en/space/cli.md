# CLI and agent skill

The CLI manages schedules through the Space API. The `orpheus-space` skill tells the agent how to identify the requester, select their schedules and clarify the repeat rule.

## Installation

Installation in a Linux Codex sandbox. For arm64, replace `arch=amd64` with `arch=arm64`. For another agent, use its skills directory. The commands download the CLI and skill from one [Space release](https://github.com/orpheus-agents/orpheus-space/releases), verify SHA256 and preserve `references/`.

```sh
set -eu
version=v0.10.0
arch=amd64
release="https://github.com/orpheus-agents/orpheus-space/releases/download/$version"
for file in "orpheus-space_${version}_linux_${arch}.tar.gz" "orpheus-space_${version}_skill.tar.gz" checksums.txt; do
  curl -fsSLO "$release/$file"
done
sha256sum --check --ignore-missing checksums.txt
mkdir -p "$HOME/.local/bin" "$HOME/.agents/skills"
tar -xzf "orpheus-space_${version}_linux_${arch}.tar.gz" -C "$HOME/.local/bin"
tar -xzf "orpheus-space_${version}_skill.tar.gz" -C "$HOME/.agents/skills"
export PATH="$HOME/.local/bin:$PATH"
orpheus-space --version
```

Include them in the [sandbox template](../configuration/templates.md) so new sessions can use them. Supply the [CLI environment variables](../reference/space.md#cli) to the agent:

```dotenv
ORPHEUS_SPACE_HOST=https://space.example.com
ORPHEUS_SPACE_API_KEY=<space-api-key>
```

Use a key from Space's [`PUBLIC_API_KEYS`](../reference/space.md#access). The host has no `/api/v1` suffix. Define a [service](../configuration/secrets.md#services) with both ENV names, supply their values to the Orpheus worker and select the service in the workflow or session. This grants the agent the API key's full schedule permissions. Select it only when the task needs to manage schedules.

## Verify

```sh
orpheus-space services --json
orpheus-space profiles --json
orpheus-space templates --json
orpheus-space schedule list --owner-email alice@example.com --json
```

The skill identifies the requester from verified connector metadata and handles only their schedules. Without verified email, it must not guess the owner. These are agent instructions, not restrictions on the shared API. See [commands, retries and schedule selection](../reference/space-cli.md).
