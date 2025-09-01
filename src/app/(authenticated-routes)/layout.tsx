'use client';

import { redirect, useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import Header from '../../presentation/components/Header';
import Footer from '../../presentation/components/Footer';
import { useHome } from '../../providers/home-data-provider';
import LoadingScreen from '../../presentation/components/Loading';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { homeData, isHomeDataLoading } = useHome();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!homeData && !isHomeDataLoading) {
      redirect('/login');
    }
  }, [homeData]);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
