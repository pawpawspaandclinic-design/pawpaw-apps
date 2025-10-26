# 🚀 Deployment Guide for PawPaw PWA

## Prerequisites
- Hostinger account (shared hosting or VPS)
- Google account (for Sheets, Apps Script, etc.)

## Step 1: Set Up Google Services

1. **Create Google Sheet**
   - Create a new Google Sheet named `PawPawDB`
   - Create these tabs: `CONFIG`, `SERVICES`, `STAFF`, `BOOKINGS`, `VACCINATIONS`, `INVENTORY`, `EMAIL_TEMPLATES`
   - Note the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

2. **Create Apps Script**
   - Open your Sheet → Extensions → Apps Script
   - Replace the default code with the content from `/backend/Code.gs`
   - Replace `YOUR_SHEET_ID` with your actual Sheet ID
   - Deploy as Web App: 
     - Execute as: `Me`
     - Who has access: `Anyone`
     - Copy the Web App URL

3. **Configure Frontend**
   - Open `src/config.ts` in your React project
   - Set `API_BASE_URL` to your Apps Script Web App URL

## Step 2: Build Frontend

```bash
cd app
npm install
npm run build
```

This creates a `dist` folder with production-ready files.

## Step 3: Deploy to Hostinger

1. Log in to Hostinger control panel
2. Go to File Manager
3. Upload all contents of `/dist` to `public_html`
4. Add `.htaccess` file with SPA rules:

```
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

5. Enable SSL in Hostinger control panel

## Step 4: Test Installation

1. Visit your domain
2. Complete a test booking
3. Check:
   - Google Sheet for new booking row
   - Your email for confirmation
   - Calendar for new event

Your PWA is now live! 🎉
