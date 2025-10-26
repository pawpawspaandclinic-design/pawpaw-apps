'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Download, Share2 } from 'lucide-react';

const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

export function PwaInstall() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showIosHint, setShowIosHint] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      // You can show a toast or notification here
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (isIOS && !(window.navigator as any).standalone) {
      setShowIosHint(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      const result = await installPrompt.prompt();
      if (result.outcome === 'accepted') {
        setIsInstalled(true);
        setInstallPrompt(null);
      }
    }
  };

  if (isInstalled) {
    return null;
  }

  if (showIosHint) {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50 p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-xl shadow-lg text-center">
        <p className="text-sm font-medium">To install, tap <Share2 size={16} className="inline" /> and then 'Add to Home Screen'.</p>
        <Button variant="ghost" size="sm" onClick={() => setShowIosHint(false)} className="mt-2">Dismiss</Button>
      </div>
    );
  }

  if (installPrompt) {
    return (
      <Button
        onClick={handleInstallClick}
        className="fixed bottom-4 right-4 z-50 rounded-full h-14 w-14 bg-gradient-to-r from-pawpaw-purple to-pawpaw-pink text-white shadow-lg hover:shadow-pawpaw-pink/50 transition-shadow"
      >
        <Download size={24} />
      </Button>
    );
  }

  return null;
}
