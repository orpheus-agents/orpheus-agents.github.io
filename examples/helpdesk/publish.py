#!/usr/bin/env python3
"""Illustrative hook. Adapt the URL and payload to your helpdesk API."""
import json
import os
from pathlib import Path
from urllib.request import Request, urlopen

if os.environ.get("ORPHEUS_AGENT_STATUS") != "completed":
    raise SystemExit("Agent did not complete. No comment published.")
reply = Path(os.environ["ORPHEUS_WORKSPACE_PATH"], "replies", os.environ["ORPHEUS_RUN_ID"] + ".md")
text = reply.read_text().strip()
if not text:
    raise SystemExit("Reply file is empty.")
request = Request(
    f"{os.environ['HELPDESK_URL'].rstrip('/')}/tickets/{os.environ['TICKET_ID']}/comments",
    data=json.dumps({"body": text, "internal": True}).encode(),
    headers={
        "Authorization": f"Bearer {os.environ['HELPDESK_TOKEN']}",
        "Content-Type": "application/json",
        "Idempotency-Key": os.environ["ORPHEUS_HOOK_OPERATION_ID"],
    },
    method="POST",
)
with urlopen(request, timeout=30) as response:
    print(f"Comment published: HTTP {response.status}")
