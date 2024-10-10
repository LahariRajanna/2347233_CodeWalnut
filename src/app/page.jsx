'use client';

import Navbar from "@/components/Home/Navbar";
import PokemonListing from "@/components/Home/PokemonListing";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AboutMe from "@/components/Home/AboutMe";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/login'); 
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <>
      <Navbar />
      <AboutMe/>
    </>
  );
}
