#!/bin/bash

# Kill any existing processes
pkill -f "uvicorn|node|yarn start"

# Set project root
PROJECT_ROOT="/Users/eriksjaastad/projects/Portfolio-ai"

# Start backend server with timeout monitoring
cd "$PROJECT_ROOT/backend"
./run_server.sh &

# Wait a moment for the backend to start
echo "Waiting for backend to start..."
for i in {1..30}; do
    if curl -s http://localhost:8000/api/profile > /dev/null; then
        echo "Backend is running!"
        break
    fi
    sleep 1
    if [ $i -eq 30 ]; then
        echo "Backend failed to start within 30 seconds"
        pkill -f "uvicorn|node|yarn start"
        exit 1
    fi
done

# Start frontend server
cd "$PROJECT_ROOT/frontend"
REACT_APP_BACKEND_URL=http://localhost:8000 yarn start &

# Wait for frontend to start
echo "Waiting for frontend to start..."
for i in {1..30}; do
    if curl -s http://localhost:3000 > /dev/null; then
        echo "Frontend is running!"
        break
    fi
    sleep 1
    if [ $i -eq 30 ]; then
        echo "Frontend failed to start within 30 seconds"
        pkill -f "uvicorn|node|yarn start"
        exit 1
    fi
done

echo "Development servers started!"
echo "Backend running on: http://localhost:8000"
echo "Frontend running on: http://localhost:3000"

# Keep script running and handle cleanup
cleanup() {
    echo "Shutting down servers..."
    pkill -f "uvicorn|node|yarn start"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Monitor server processes
echo "Press Ctrl+C to stop the servers"
tail -f /dev/null & # Keep script running without consuming CPU
wait $!