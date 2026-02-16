@echo off
echo ===============================================
echo   Champion Sport Academy - Backend Launcher
echo ===============================================

cd backend

echo.
echo [1/4] Cleaning stale files...
if exist "src\controllers\eventController.js" del "src\controllers\eventController.js"
rem Recursively delete all .js files in src to prevent shadowing
del /s /q "src\*.js" 2>nul
if exist "dist" rmdir /s /q "dist"

echo.
echo [2/4] Installing dependencies...
call npm install

echo.
echo [3/4] Updating Database Schema...
call npx prisma generate
call npx prisma db push

echo.
echo [4/4] Starting Server in DEV mode...
echo       (Please wait for 'Server is running...' and new logs)
echo ===============================================
call npm run dev
