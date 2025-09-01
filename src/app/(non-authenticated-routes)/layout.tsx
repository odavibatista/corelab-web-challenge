"use client";

import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";
import { useHome } from "../../providers/home-data-provider";
import LoadingScreen from "../../presentation/components/Loading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { homeData, isHomeDataLoading } = useHome();

  useLayoutEffect(() => {
    (async () => {
      if (homeData && !isHomeDataLoading) {
        redirect("/dashboard");
      }
    })();
  }, [homeData]);

  if (isHomeDataLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}