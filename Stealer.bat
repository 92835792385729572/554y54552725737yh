@echo off

set scriptpath=%~dp0

  findstr /C:"RUN_NPM_UPDATE" "%scriptpath%\STATUS.txt" >nul
  if not errorlevel 1 (
    echo sg spooferr - Updating required NPM packages
    call npm install
)

title SGSPOOFER
node Default.mjs

PAUSE
