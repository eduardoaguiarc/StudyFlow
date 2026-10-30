"""Start the local stack without credentials or visible helper windows."""
import os
from pathlib import Path
import socket
import subprocess
import time
import urllib.request
import webbrowser

ROOT = Path(__file__).resolve().parents[1]
LOCAL = ROOT / '.local-ai'


def listening(port):
    with socket.socket() as sock:
        sock.settimeout(1)
        return sock.connect_ex(('127.0.0.1', port)) == 0


def start(name, command, port, env):
    if listening(port):
        print(f'{name}: porta {port} ja esta ativa.')
        return
    with (LOCAL / f'{name}.log').open('a', encoding='utf-8') as log:
        process = subprocess.Popen(command, cwd=ROOT, env=env, stdout=log,
                                   stderr=subprocess.STDOUT,
                                   creationflags=subprocess.CREATE_NO_WINDOW)
    (LOCAL / f'{name}.pid').write_text(str(process.pid))
    for _ in range(60):
        if listening(port):
            print(f'{name}: iniciado.')
            return
        if process.poll() is not None:
            break
        time.sleep(1)
    raise RuntimeError(f'{name} nao iniciou. Consulte .local-ai/{name}.log')


if __name__ == '__main__':
    LOCAL.mkdir(exist_ok=True)
    env = os.environ.copy()
    env.update(OLLAMA_HOST='127.0.0.1:11434', OLLAMA_MODELS=str(LOCAL / 'models'),
               OLLAMA_CONTEXT_LENGTH='16384', OLLAMA_NO_CLOUD='1',
               MODEL='ollama_chat/qwen3:4b', LITELLM_LOCAL_MODEL_COST_MAP='True')
    start('ollama', [str(LOCAL / 'ollama/ollama.exe'), 'serve'], 11434, env)
    start('adk', [str(ROOT / '.venv/Scripts/adk.exe'), 'web', '--host', '127.0.0.1',
                  '--port', '8000', 'agents'], 8000, env)
    start('vite', ['cmd.exe', '/c', 'npm.cmd run dev -- --host 127.0.0.1'], 3000, env)
    print('StudyFlow: http://127.0.0.1:3000 | ADK: http://127.0.0.1:8000')
    webbrowser.open('http://127.0.0.1:3000')
