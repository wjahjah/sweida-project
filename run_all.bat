@echo off
setlocal enabledelayedexpansion

echo --- Starting Sweida Fund Project ---

:: الحصول على المسار الحالي للباتش لضمان عدم حدوث أخطاء في التنقل
set "BASE_DIR=%~dp0"

:: 1. فتح فيجوال استديو كود
echo 📂 Opening VS Code...
start /b code "%BASE_DIR%"

:: انتظر قليلاً
timeout /t 3 /nobreak > nul

:: 2. تشغيل الباك أند (المسار الصحيح هو src/app.js)
echo 🚀 Starting Backend...
start "Backend (Fastify)" cmd /k "cd /d %BASE_DIR%backend && node src/app.js"

:: 3. تشغيل الفرونت أند
echo 🚀 Starting Frontend...
start "Frontend (Vite)" cmd /k "cd /d %BASE_DIR%frontend && npm run dev"

:: 4. تشغيل الادمن
echo 🚀 Starting Admin....
start "Frontend (Vite)" cmd /k "cd /d %BASE_DIR%admin-frontend && npm run dev"

echo.
echo ==========================================
echo ✅ Project is launching with Professional Structure!
echo 🌐 Backend Entry: backend/src/app.js
echo 🌐 Frontend: Check Vite terminal for URL
echo ==========================================
pause