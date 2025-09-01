"use client";

import s from "./styles.module.scss";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useHome } from "../../../providers/home-data-provider";
import refreshPage from "../../../server/utils/refresh.function";

export default function Header() {
  const { homeData, isHomeDataLoading } = useHome();
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (homeData && !isHomeDataLoading) {
        setIsLoggedin(true);
        setUserName(homeData?.name);
      }
    })();
  });

  const handleLogout = async () => {
    setIsLoggedin(false);
    setUserName(null);
    sessionStorage.clear();
    await refreshPage();
    redirect("/login");
  };

  return (
    <header>

    </header>
  );
}