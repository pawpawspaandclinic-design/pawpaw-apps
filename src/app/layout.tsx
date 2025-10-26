import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  manifest: '/manifest.webmanifest',
  title: "PawPaw Spa & Clinic",
  description: "Your one-stop destination for pet wellness and care.",
  keywords: ["PawPaw", "Pet Spa", "Pet Clinic", "PWA", "Next.js"],
  authors: [{ name: "PawPaw Team" }],
  icons: {
    icon: "/icons/icon-512x512.png",
    apple: "/icons/apple-180.png",
  },
  openGraph: {
    title: "PawPaw Spa & Clinic",
    description: "Your one-stop destination for pet wellness and care.",
    url: "https://pawpaw.clinic", // Replace with your actual URL
    siteName: "PawPaw Spa & Clinic",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PawPaw Spa & Clinic",
    description: "Your one-stop destination for pet wellness and care.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${poppins.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
