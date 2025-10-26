// Configuration for PawPaw PWA
export const config = {
  // Google Apps Script Backend URL
  // Replace this with your actual Apps Script Web App URL after deployment
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://script.google.com/macros/s/YOUR_WEB_APP_URL_HERE/exec',
  
  // Supabase Configuration
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  
  // App Configuration
  APP_NAME: 'PawPaw Spa & Clinic',
  APP_VERSION: '1.0.0',
  
  // PWA Configuration
  PWA_DISPLAY: 'standalone',
  PWA_ORIENTATION: 'portrait',
  
  // Contact Information
  CONTACT_EMAIL: 'info@pawpawspaandclinic.com',
  CONTACT_PHONE: '+1-234-567-8900',
  
  // Business Hours
  BUSINESS_HOURS: {
    monday: { open: '09:00', close: '18:00' },
    tuesday: { open: '09:00', close: '18:00' },
    wednesday: { open: '09:00', close: '18:00' },
    thursday: { open: '09:00', close: '18:00' },
    friday: { open: '09:00', close: '18:00' },
    saturday: { open: '09:00', close: '16:00' },
    sunday: { closed: true }
  }
};
