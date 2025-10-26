@echo off
echo ========================================
echo PawPaw PWA - One-Click Deployment
echo ========================================
echo.
echo This will deploy to: app.pawpawspaandclinic.com
echo.
pause

cd /d "%~dp0"

echo [1/3] Checking build...
if not exist ".next" (
    echo ERROR: Build not found!
    echo Please run: npm run build
    pause
    exit /b 1
)

echo [2/3] Creating deployment package...
tar -a -c -f deploy_package.zip .next public package.json next.config.js .env.production

echo [3/3] Package created: deploy_package.zip
echo.
echo ========================================
echo NEXT STEPS (Manual):
echo ========================================
echo 1. Go to Hostinger File Manager
echo 2. Navigate to: /home/u151624428/domains/app.pawpawspaandclinic.com/public_html
echo 3. Upload deploy_package.zip
echo 4. Extract it in the File Manager
echo 5. Your site will be live at: https://app.pawpawspaandclinic.com
echo.
echo Package location: %CD%\deploy_package.zip
echo.
pause
