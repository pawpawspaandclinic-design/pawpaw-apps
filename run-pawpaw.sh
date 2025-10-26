#!/bin/bash
cd /home/z/my-project/pawpaw-pwa-mvp/app
echo "Starting PawPaw PWA app..."
echo "Current directory: $(pwd)"
echo "Files in directory:"
ls -la
echo ""
echo "Starting Vite..."
npx vite --port 3001 --host 0.0.0.0