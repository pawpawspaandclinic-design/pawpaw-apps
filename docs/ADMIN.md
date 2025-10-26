# 🛠️ Admin Dashboard Guide

Access your admin dashboard at: `https://yourdomain.com/admin` (or secret link)

## Features

- **View Bookings**: See all appointments
- **Manage Inventory**: Add/update products
- **Vaccination Schedule**: Track upcoming vaccines
- **Email Templates**: Customize notifications

## Access Control

1. **Secret Link Method**: 
   - The dashboard is hidden at a secret URL
   - Share only with authorized staff

2. **Firebase Auth (Optional)**:
   - If you enabled Firebase:
     1. Add admin emails in Firebase console
     2. They'll receive sign-in links

## Inventory Management

1. Go to INVENTORY tab in Google Sheet
2. Add products with:
   - SKU
   - Name
   - Price
   - Stock
   - Image URL

3. Changes appear instantly in the PWA
