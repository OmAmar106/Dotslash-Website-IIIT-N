first=0


if [[ $first -ne 0 ]]; then
    echo "[*] Setting up environment..."
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    npm install
else
    source .venv/bin/activate
fi

trap "echo 'Stopping servers...'; kill 0" EXIT

echo "[*] Starting backend..."
python backend/app.py &

echo "[*] Starting frontend..."
npm run dev &

wait