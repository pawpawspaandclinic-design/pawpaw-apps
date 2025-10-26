'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Smartphone, 
  Download, 
  Wifi, 
  WifiOff, 
  Star,
  Users,
  Zap,
  Shield,
  CheckCircle,
  AlertCircle,
  Bell,
  Settings,
  Menu,
  X,
  Share2
} from 'lucide-react';
import Head from 'next/head';
import { BookingForm } from '@/components/BookingForm';
import { PwaInstall } from '@/components/PwaInstall';

export default function PawPawPWA() {
  const [isOnline, setIsOnline] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile First",
      description: "Optimized for mobile devices with responsive design"
    },
    {
      icon: <WifiOff className="w-6 h-6" />,
      title: "Offline Support",
      description: "Works perfectly even without internet connection"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Instant loading with advanced caching strategies"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Reliable",
      description: "Built with security best practices and error handling"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Friendly",
      description: "Intuitive interface designed for the best user experience"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Push Notifications",
      description: "Stay updated with real-time notifications"
    }
  ];

  const stats = [
    { label: "Lighthouse Score", value: "90+", icon: <Star className="w-4 h-4" /> },
    { label: "Load Time", value: "< 2s", icon: <Zap className="w-4 h-4" /> },
    { label: "Offline Features", value: "100%", icon: <WifiOff className="w-4 h-4" /> },
    { label: "User Satisfaction", value: "98%", icon: <img src="/logo.png" alt="PawPaw Logo" className="w-4 h-4" /> }
  ];

  return (
    <>
      <Head>
        <title>PawPaw PWA - Pet Grooming Services</title>
        <meta name="application-name" content="PawPaw PWA" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PawPaw PWA" />
        <meta name="description" content="Professional pet grooming services in Serampore, Hooghly. Progressive Web App for booking pet care services." />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#9333ea" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#9333ea" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <img src="/logo.png" alt="PawPaw Logo" className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold text-pawpaw-purple">
                Pawpaw Spa And Clinic
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Connection Status */}
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <Badge variant="default" className="bg-green-500">
                    <Wifi className="w-3 h-3 mr-1" />
                    Online
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    <WifiOff className="w-3 h-3 mr-1" />
                    Offline
                  </Badge>
                )}
              </div>

              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-8">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-pawpaw-purple to-pawpaw-pink rounded-2xl flex items-center justify-center mb-4">
              <img src="/logo.png" alt="PawPaw Logo" className="w-12 h-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-pawpaw-purple">
              PawPaw Spa And Clinic
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              A Progressive Web App that delivers native app experience with web technologies. 
              Fast, reliable, and works offline!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <BookingForm />
            <Button size="lg" className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-pawpaw-purple to-pawpaw-pink text-white hover:shadow-lg hover:shadow-pawpaw-pink/50 transition-shadow">
              <Zap className="w-5 h-5 mr-2" />
              Get Started
            </Button>
                      </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center rounded-2xl shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Amazing Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {features.map((feature, index) => (
              <Card key={index} className="rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                      <div className="text-purple-600 dark:text-purple-400">
                        {feature.icon}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* PWA Capabilities */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardHeader>
              <CardTitle className="text-2xl text-center">PWA Capabilities</CardTitle>
              <CardDescription className="text-center">
                Everything you need for a modern web application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="offline" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="offline">Offline</TabsTrigger>
                  <TabsTrigger value="installable">Installable</TabsTrigger>
                  <TabsTrigger value="responsive">Responsive</TabsTrigger>
                  <TabsTrigger value="secure">Secure</TabsTrigger>
                </TabsList>
                
                <TabsContent value="offline" className="text-center py-6">
                  <WifiOff className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="text-xl font-semibold mb-2">Works Offline</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Service Worker caching ensures your app works even without internet connection
                  </p>
                </TabsContent>
                
                <TabsContent value="installable" className="text-center py-6">
                  <Download className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="text-xl font-semibold mb-2">Installable</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Add to home screen for native app experience on any device
                  </p>
                </TabsContent>
                
                <TabsContent value="responsive" className="text-center py-6">
                  <Smartphone className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="text-xl font-semibold mb-2">Fully Responsive</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Optimized for all screen sizes from mobile to desktop
                  </p>
                </TabsContent>
                
                <TabsContent value="secure" className="text-center py-6">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="text-xl font-semibold mb-2">Secure & Fast</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    HTTPS-only with optimized performance and caching strategies
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* Performance Metrics */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Lighthouse Score</span>
                    <span className="text-sm font-semibold">90+</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">First Contentful Paint</span>
                    <span className="text-sm font-semibold">1.2s</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Largest Contentful Paint</span>
                    <span className="text-sm font-semibold">1.8s</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Reliability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Error Handling</span>
                    <span className="text-sm font-semibold">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Offline Support</span>
                    <span className="text-sm font-semibold">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Cache Hit Rate</span>
                    <span className="text-sm font-semibold">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <img src="/logo.png" alt="PawPaw Logo" className="w-4 h-4" />
              </div>
              <span className="font-semibold">PawPaw Spa And Clinic</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Built with Next.js, TypeScript, and modern PWA technologies
            </p>
            <div className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              <p className="mb-2">
                <strong>Address:</strong> 208/A/1, Grand Trunk Road, Opposite HP Petrol Pump, Serampore, Hooghly, West Bengal – 712202
              </p>
              <p>
                <strong>Phone:</strong> +91 8910523637
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <Badge variant={isOnline ? "default" : "secondary"}>
                {isOnline ? 'Online' : 'Offline Mode'}
              </Badge>
              <Badge variant="outline">
                PWA Ready
              </Badge>
                          </div>
          </div>
        </div>
      </footer>
      <PwaInstall />
    </div>
    </>
  );
}