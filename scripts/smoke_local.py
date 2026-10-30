"""Live ADK/Ollama check; uses only a synthetic study request."""
import json
from pathlib import Path
import time
import urllib.request
import uuid

base = 'http://127.0.0.1:3000/adk'
session = 'local-test-' + uuid.uuid4().hex


def post(path, body):
    request = urllib.request.Request(base + path, data=json.dumps(body).encode(),
                                     headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(request, timeout=600) as response:
        return json.load(response)


post('/apps/study_coach/users/local-test/sessions/' + session, {})
start = time.monotonic()
events = post('/run', {'appName': 'study_coach', 'userId': 'local-test',
                       'sessionId': session, 'newMessage': {'role': 'user', 'parts': [
                           {'text': 'Quero organizar meus estudos de JavaScript.'}]}})
Path('.local-ai/test-events.json').write_text(json.dumps(events, ensure_ascii=False, indent=2), encoding='utf-8')
parts = [part for event in events for part in (event.get('content') or {}).get('parts', [])]
calls = [part['functionCall'] for part in parts if part.get('functionCall')]
answers = [part['text'] for part in parts if part.get('text') and not part.get('thought')]
print('Seconds:', round(time.monotonic() - start, 1))
print('Calls:', calls)
print('\n'.join(answers))
assert answers, 'No model answer'
assert any(call['name'] == 'load_skill' for call in calls), 'Skill not loaded'
assert not any(call['name'] == 'load_skill_resource' for call in calls), 'Gating violated'
