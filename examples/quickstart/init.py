"""Create local configuration without overwriting existing files."""
from datetime import datetime, timezone
from pathlib import Path
import base64
import secrets

root = Path(__file__).resolve().parent
outputs = [root / ".env", root / "orpheus.toml", root / "workflows/assistant.md"]
if any(path.exists() for path in outputs):
    raise SystemExit("Configuration exists. Edit it in place instead of running init again.")

values = {
    "POSTGRES_PASSWORD": secrets.token_hex(24),
    "ORPHEUS_API_KEY": secrets.token_hex(32),
    "ENV_ENCRYPTION_KEY": base64.urlsafe_b64encode(secrets.token_bytes(32)).decode(),
}
env = (root / ".env.example").read_text()
for name, value in values.items():
    env = env.replace(f"{name}=\n", f"{name}={value}\n")
outputs[0].write_text(env)
outputs[0].chmod(0o600)
outputs[1].write_text((root / "orpheus.toml.example").read_text())
outputs[2].parent.mkdir(exist_ok=True)
workflow = (root / "workflow.md.example").read_text()
cutover = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
outputs[2].write_text(workflow.replace("RECONCILE_FROM", cutover))
print("Created .env, orpheus.toml and workflows/assistant.md. Fill in credentials and Mattermost URL.")
