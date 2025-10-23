'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Inicio from "./1/Inicio";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    if (isLoggedIn !== 'true') {
      router.push('/login');
    }
  }, [router]);

  const isLoggedIn = typeof window !== 'undefined' ? localStorage.getItem('userLoggedIn') === 'true' : false;

  if (!isLoggedIn) {
    return null; // O un componente de carga
  }

  return <Inicio />;
}
