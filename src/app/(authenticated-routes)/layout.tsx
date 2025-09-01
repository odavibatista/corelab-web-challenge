"use client";

import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";
import { useHome } from "../../providers/home-data-provider";
import Header from "../../presentation/components/Header";
import Footer from "../../presentation/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { homeData } = useHome();

  useLayoutEffect(() => {
    (async () => {
      if (!homeData) {
        redirect("/login");
      }
    })();
  }, [homeData]);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}