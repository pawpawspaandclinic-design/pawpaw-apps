# PawPaw PWA - Hostinger Deployment Guide

## 📦 Deployment Package Created
**File:** `hostinger-deploy.zip`
**Location:** `c:\Users\sbari\Downloads\pawpaw apps\hostinger-deploy.zip`

---

## 🚀 Step-by-Step Deployment Instructions

### Step 1: Access Hostinger File Manager
1. Log in to your Hostinger account at https://hpanel.hostinger.com
2. Navigate to **File Manager**
3. Go to: `/home/u151624428/domains/app.pawpawspaandclinic.com/public_html`

### Step 2: Backup Existing Files (if any)
1. If there are existing files, create a backup folder: `backup_[date]`
2. Move all existing files to the backup folder

### Step 3: Upload Deployment Package
1. Click **Upload** button in File Manager
2. Select `hostinger-deploy.zip` from your computer
3. Wait for upload to complete (may take 2-5 minutes depending on connection)

### Step 4: Extract Files
1. Right-click on `hostinger-deploy.zip`
2. Select **Extract**
3. Extract to current directory (`public_html`)
4. Delete `hostinger-deploy.zip` after extraction

### Step 5: Set Environment Variables
1. In File Manager, create a new file: `.env.production`
2. Add the following content:
```
NEXT_PUBLIC_SUPABASE_URL=https://qpswzhkpqstmkuxhmumq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwc3d6aGtwcXN0bWt1eGhtdW1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0OTk3NzIsImV4cCI6MjA3NzA3NTc3Mn0.PX49ZNOpybNwhyEzSYZoZFo4VUeCbPSTORAHEG97kd8
```
3. Save the file

### Step 6: Configure Node.js Application (if Hostinger supports it)
1. In Hostinger panel, go to **Advanced** → **Node.js**
2. Select Node.js version: **18.x LTS**
3. Set Application Root: `/home/u151624428/domains/app.pawpawspaandclinic.com/public_html`
4. Set Application URL: `https://app.pawpawspaandclinic.com`
5. Set Application Startup File: `server.js` (we'll create this)

### Step 7: Create Server File
Create a new file `server.js` in `public_html` with this content:
```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = false;
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

### Step 8: Install Dependencies
1. In Hostinger, open **SSH Access** or use **Terminal** in File Manager
2. Navigate to your directory:
   ```bash
   cd /home/u151624428/domains/app.pawpawspaandclinic.com/public_html
   ```
3. Install dependencies:
   ```bash
   npm install --production
   ```

### Step 9: Start the Application
```bash
npm start
```

Or use PM2 for production:
```bash
npm install -g pm2
pm2 start npm --name "pawpaw-pwa" -- start
pm2 save
pm2 startup
```

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Site loads at: https://app.pawpawspaandclinic.com
- [ ] HTTPS is working (green padlock in browser)
- [ ] All pages load correctly
- [ ] Supabase connection works (test at `/supa-test`)
- [ ] PWA install prompt appears
- [ ] Service worker registers successfully
- [ ] Offline mode works

---

## 🔧 Troubleshooting

### Issue: Site shows 404 or doesn't load
**Solution:** Check that files are in `public_html` directory, not in a subdirectory

### Issue: "Missing Supabase env" error
**Solution:** Ensure `.env.production` file exists with correct credentials

### Issue: Node.js app won't start
**Solution:** 
1. Check Node.js version is 18.x
2. Run `npm install` again
3. Check error logs in Hostinger panel

### Issue: HTTPS not working
**Solution:** 
1. Go to Hostinger panel → SSL
2. Ensure SSL certificate is installed for app.pawpawspaandclinic.com
3. Force HTTPS redirect is enabled

---

## 📊 Deployment Summary

- **Framework:** Next.js 15.3.5
- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Node Version:** 18.x LTS
- **Backend:** Supabase
- **Domain:** app.pawpawspaandclinic.com
- **Deployment Package:** hostinger-deploy.zip

---

## 🔄 Future Updates

To deploy updates:
1. Run `npm run build` locally
2. Create new deployment package
3. Upload and extract to a new release folder
4. Update symlink or restart Node.js app

---

## 📞 Support

If you encounter issues:
1. Check Hostinger documentation: https://support.hostinger.com
2. Review Next.js deployment docs: https://nextjs.org/docs/deployment
3. Check application logs in Hostinger panel
