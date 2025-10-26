# 🚀 PawPaw PWA Deployment Instructions

## ✅ Current Status
- ✅ Build completed successfully
- ✅ Deployment package created: `deploy_package.zip`
- ✅ Configuration file created: `src/config.ts`

## 📦 Deployment Package Contents
Your `deploy_package.zip` contains:
- `.next/` - Production build files
- `public/` - Static assets (icons, images, etc.)
- `package.json` - Dependencies
- `next.config.js` - Next.js configuration
- `.env.production` - Environment variables

## 🌐 Manual Deployment Steps (Hostinger)

### Step 1: Upload to Hostinger
1. Log in to your Hostinger control panel
2. Go to **File Manager**
3. Navigate to: `/home/u151624428/domains/app.pawpawspaandclinic.com/public_html`
4. Upload `deploy_package.zip` from your local project folder
5. Extract the zip file in the File Manager

### Step 2: Set Up Google Apps Script Backend
1. **Create Google Sheet:**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new sheet named `PawPawDB`
   - Create these tabs: `CONFIG`, `SERVICES`, `STAFF`, `BOOKINGS`, `VACCINATIONS`, `INVENTORY`, `EMAIL_TEMPLATES`
   - Copy the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

2. **Deploy Apps Script:**
   - Open your sheet → Extensions → Apps Script
   - Replace the default code with content from `backend/Code.gs`
   - Replace `YOUR_SHEET_ID` with your actual Sheet ID
   - Deploy as Web App:
     - Execute as: `Me`
     - Who has access: `Anyone`
     - Copy the Web App URL

3. **Update Configuration:**
   - In your Hostinger File Manager, edit `.env.production`
   - Add your Apps Script URL: `NEXT_PUBLIC_API_BASE_URL=https://script.google.com/macros/s/YOUR_WEB_APP_URL/exec`

### Step 3: Install Dependencies
1. Access your server via SSH (Hostinger provides SSH access)
2. Navigate to your project directory
3. Run: `npm install --production`

### Step 4: Configure Server
1. Ensure Node.js is installed on your Hostinger server
2. Set up a process manager (PM2 recommended):
   ```bash
   npm install -g pm2
   pm2 start npm --name "pawpaw-pwa" -- start
   ```

### Step 5: Test Your Deployment
1. Visit: https://app.pawpawspaandclinic.com
2. Test the booking functionality
3. Check that data appears in your Google Sheet
4. Verify email confirmations are sent

## 🔧 Alternative: Static Deployment (Simpler)

If you prefer a static deployment without Node.js:

1. Use the existing `pawpaw-pwa.html` file in your project root
2. Upload it directly to `public_html`
3. Update the API configuration in the HTML file to point to your Apps Script

## 📱 PWA Features
Your deployed app includes:
- ✅ Service Worker for offline functionality
- ✅ Installable on iOS/Android
- ✅ Responsive design
- ✅ Offline booking queuing
- ✅ Real-time sync when online

## 🐛 Troubleshooting

### Common Issues:
1. **Build errors:** Make sure all dependencies are installed locally
2. **API connection:** Verify your Apps Script URL is correct and accessible
3. **Environment variables:** Ensure `.env.production` is properly configured
4. **Permissions:** Check file permissions on the server (755 for directories, 644 for files)

### Rollback Instructions:
If something goes wrong, you can rollback by:
1. Accessing your server via SSH
2. Navigating to the domains directory
3. Restoring from a previous backup

## 📞 Support
- Domain: app.pawpawspaandclinic.com
- Local package: `deploy_package.zip`
- Configuration: `src/config.ts`

Your PawPaw PWA is ready for deployment! 🎉
