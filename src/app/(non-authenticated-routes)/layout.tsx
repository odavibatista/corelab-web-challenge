"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useLayoutEffect(() => {
    (async () => {

    })();
  }, []);

  return <>{children}</>;
}