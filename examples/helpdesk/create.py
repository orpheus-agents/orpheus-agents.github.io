"""Illustrative admission request, not a webhook server."""
import json
import os
from pathlib import Path
from urllib.request import Request, urlopen

body = {
    "namespace": "helpdesk",
    "external_key": "support.example.com:ticket:4821",
    "configuration": {
        "agent": {
            "profile": "default",
            "instructions": "Prepare an internal reply. Read reply-path.txt and atomically save the finished Markdown reply to that path. Do not publish it yourself.",
        },
        "sandbox": {"template": "codex"},
        "hooks": {
            "before_run": '#!/bin/sh\nset -eu\nmkdir -p replies\nprintf "replies/%s.md\\n" "$ORPHEUS_RUN_ID" > reply-path.txt\n',
            "after_run": Path(__file__).with_name("publish.py").read_text(),
        },
    },
    "env": {"TICKET_ID": "4821"},
    "env_from": ["HELPDESK_URL", "HELPDESK_TOKEN"],
    "messages": [{"text": "Ticket 4821: export permission denied. Suggest what the operator should check."}],
}
request = Request(
    os.environ["ORPHEUS_URL"].rstrip("/") + "/api/v1/sessions",
    data=json.dumps(body).encode(),
    headers={
        "Authorization": f"Bearer {os.environ['ORPHEUS_API_KEY']}",
        "Content-Type": "application/json",
        "Idempotency-Key": "helpdesk:ticket:4821:event:105",
    },
    method="POST",
)
with urlopen(request, timeout=30) as response:
    print(response.read().decode())
