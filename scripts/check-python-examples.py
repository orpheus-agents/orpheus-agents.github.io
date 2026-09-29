"""Verify initialization and publication behavior without real credentials."""
import ast
import base64
import contextlib
import io
import json
import os
from pathlib import Path
import runpy
import shutil
import subprocess
import tempfile
import tomllib
from unittest.mock import patch

root = Path(__file__).resolve().parents[1]
for path in (root / 'examples').rglob('*.py'):
    ast.parse(path.read_text())
with tempfile.TemporaryDirectory() as temporary:
    directory = Path(temporary)
    shutil.copytree(root / 'examples/quickstart', directory / 'stack', ignore=shutil.ignore_patterns('.env', 'orpheus.toml', 'workflows', '__pycache__'))
    script = directory / 'stack/init.py'
    subprocess.run(['python3', str(script)], check=True, capture_output=True)
    env = dict(line.split('=',1) for line in (script.parent / '.env').read_text().splitlines() if '=' in line)
    assert len(base64.urlsafe_b64decode(env['ENV_ENCRYPTION_KEY'])) == 32
    assert len(env['ORPHEUS_API_KEY']) == 64
    assert (script.parent / '.env').stat().st_mode & 0o777 == 0o600
    tomllib.loads((script.parent / 'orpheus.toml').read_text())
    original = (script.parent / '.env').read_bytes()
    assert subprocess.run(['python3',str(script)],capture_output=True).returncode != 0
    assert (script.parent / '.env').read_bytes() == original
    replies = directory / 'replies'
    replies.mkdir()
    output = replies / 'run-fixture.md'
    output.write_text('Suggested checks and draft reply.')
    settings = {'ORPHEUS_AGENT_STATUS':'completed', 'ORPHEUS_WORKSPACE_PATH':str(directory), 'ORPHEUS_RUN_ID':'run-fixture', 'ORPHEUS_HOOK_OPERATION_ID':'hook-fixture', 'HELPDESK_URL':'https://support.example.com', 'HELPDESK_TOKEN':'fixture', 'TICKET_ID':'4821'}
    requests = []
    class Response:
        status = 201
        def __enter__(self): return self
        def __exit__(self,*args): pass
    def send(request,timeout):
        requests.append(request)
        assert timeout == 30
        return Response()
    def publish():
        with patch.dict(os.environ,settings), patch('urllib.request.urlopen',send), contextlib.redirect_stdout(io.StringIO()):
            runpy.run_path(str(root / 'examples/helpdesk/publish.py'))
    publish()
    assert len(requests) == 1
    assert requests[0].full_url == 'https://support.example.com/tickets/4821/comments'
    assert json.loads(requests[0].data) == {'body':'Suggested checks and draft reply.','internal':True}
    assert requests[0].get_header('Idempotency-key') == 'hook-fixture'
    for status in ['failed','cancelled']:
        settings['ORPHEUS_AGENT_STATUS'] = status
        try: publish()
        except SystemExit: pass
        else: raise AssertionError('Unsuccessful run published')
    settings['ORPHEUS_AGENT_STATUS'] = 'completed'
    output.write_text('  ')
    try: publish()
    except SystemExit: pass
    else: raise AssertionError('Empty reply published')
    output.unlink()
    try: publish()
    except FileNotFoundError: pass
    else: raise AssertionError('Missing reply published')
    assert len(requests) == 1
print('Initializer and helpdesk publication checks passed.')
