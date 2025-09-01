"use client";


import {
  ReactNode,
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import getHomeData from "../api/endpoints/users/home-data.request";

interface HomeDataContext {
  homeData: IHomeDataUser | null;
  isHomeDataLoading: boolean;
}

interface IHomeDataUser {
  id: string;
  name: string;
}

export const HomeContext = createContext<HomeDataContext>(
  {} as HomeDataContext,
);

export const HomeProvider = ({ children }: { children: ReactNode }) => {
  const [userHomeData, setHomeData] = useState<IHomeDataUser | null>(null);
  const [isHomeDataLoading, setIsHomeDataLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  useLayoutEffect(() => {
    (async () => {
      setToken(sessionStorage.getItem("session"));

      try {
        if (token) {
          if (!token) return;
          const response = await getHomeData(token);

          if ("statusCode" in response) {
            return;
          } else {
            setHomeData(response.user);
            setIsHomeDataLoading(false);
            return;
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [token]);

  return (
    <HomeContext.Provider
      value={{
        homeData: userHomeData,
        isHomeDataLoading,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => {
  const context = useContext(HomeContext);

  if (Object.keys(context).length <= 0) {
    throw new Error(
      "O hook useHome só pode ser usado em componentes abaixo do HomeProvider.",
    );
  }

  return context;
};