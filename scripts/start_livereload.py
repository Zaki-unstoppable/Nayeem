from livereload import Server
import os

"""Run from PowerShell inside project root:
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install livereload
python scripts\start_livereload.py
"""

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

server = Server()
server.watch(os.path.join(ROOT, '**', '*.html'))
server.watch(os.path.join(ROOT, '**', '*.css'))
server.watch(os.path.join(ROOT, '**', '*.js'))
server.watch(os.path.join(ROOT, '**', '*.py'))

print(f"Serving {ROOT} on http://localhost:5500")
server.serve(root=ROOT, port=5500, host='127.0.0.1', open_url_delay=1)
