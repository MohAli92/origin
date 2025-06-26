@echo off
echo 🚀 Starting Share Dish Project on CodeSpace...

REM Check if .env files exist
if not exist "server\.env" (
    echo ❌ server\.env file not found!
    echo Please copy server\.env.example to server\.env and update the values
    pause
    exit /b 1
)

if not exist "client\.env" (
    echo ❌ client\.env file not found!
    echo Please copy client\.env.example to client\.env and update the values
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm run install-all
)

REM Start the development server
echo 🔥 Starting development server...
call npm run dev 