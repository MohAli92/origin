#!/bin/bash

echo "🚀 Starting Share Dish Project on CodeSpace..."

# Check if .env files exist
if [ ! -f "server/.env" ]; then
    echo "❌ server/.env file not found!"
    echo "Please copy server/.env.example to server/.env and update the values"
    exit 1
fi

if [ ! -f "client/.env" ]; then
    echo "❌ client/.env file not found!"
    echo "Please copy client/.env.example to client/.env and update the values"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ] || [ ! -d "server/node_modules" ] || [ ! -d "client/node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm run install-all
fi

# Start the development server
echo "🔥 Starting development server..."
npm run dev 