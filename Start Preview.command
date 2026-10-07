#!/bin/zsh
set -e
cd -- "${0:A:h}"

# Reuse this project's preview if it is already running.
if curl --silent --fail --max-time 2 http://127.0.0.1:5173/favicon.svg | cmp -s public/favicon.svg -; then
  open http://127.0.0.1:5173/
  exit 0
fi

if ! command -v npm >/dev/null 2>&1 && [[ -s "$HOME/.nvm/nvm.sh" ]]; then
  source "$HOME/.nvm/nvm.sh"
fi

if ! command -v npm >/dev/null 2>&1; then
  print 'Install Node.js, then open this file again.'
  read -r '?Press Return to close.'
  exit 1
fi

if [[ ! -d node_modules ]]; then
  npm install
fi

print 'Keep this window open while using the local preview.'
(sleep 1; open http://127.0.0.1:5173/) &
exec npm run dev -- --port 5173 --strictPort
