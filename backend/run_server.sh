#!/bin/bash

# Kill any existing uvicorn processes
pkill -f uvicorn

# Function to check if server is responding
check_server() {
    for i in {1..30}; do
        if curl -s http://localhost:8000/api/profile > /dev/null; then
            echo "Server is up and running!"
            return 0
        fi
        sleep 1
    done
    echo "Server failed to start within 30 seconds"
    return 1
}

# Start the server
echo "Starting server..."
source venv/bin/activate
python3 run.py &

# Store the server's PID
SERVER_PID=$!

# Check if server starts successfully
if ! check_server; then
    echo "Server startup failed. Killing process..."
    kill $SERVER_PID
    exit 1
fi

# Function to handle shutdown
cleanup() {
    echo "Shutting down server..."
    kill $SERVER_PID
    exit 0
}

# Set up trap for clean shutdown
trap cleanup SIGINT SIGTERM

# Keep script running
while true; do
    if ! ps -p $SERVER_PID > /dev/null; then
        echo "Server process died unexpectedly"
        exit 1
    fi
    sleep 1
done
