'use client';

import localFont from "next/font/local";
import "./globals.css";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from "./Context/ThemeContext";
import { Provider } from 'react-redux';
import store from "@/store";

const geistSans = localFont({
  src: "./fonts/New.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/New.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setIsAuthenticated(!!userId); 
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Provider store={store}> 
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-scroll-important`}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </Provider>
  );
}
