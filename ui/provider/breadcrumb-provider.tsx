"use client";
import { createContext, ReactNode, useState } from "react";

// Context Type
export type BreadCrumbContextType = {
  currentRoute: string;
  handleRouteChange: (newRoute: string) => void;
};

// Create a context with `null` as the initial value (to be checked when using it)
const BreadCrumbContext = createContext<BreadCrumbContextType | null>(null);

// Generic Props Interface
interface Props {
  initRoute: string;
  children: ReactNode;
}
// Provider component
const BreadCrumbProvider = ({ children, initRoute }: Props) => {
  const [currentRoute, setCurrentRoute] = useState<string>(initRoute);

  const handleRouteChange = (newRoute: string) => {
    setCurrentRoute(newRoute);
  };

  const value: BreadCrumbContextType = {
    currentRoute,
    handleRouteChange,
  };

  return (
    <BreadCrumbContext.Provider value={value}>
      {children}
    </BreadCrumbContext.Provider>
  );
};

export { BreadCrumbContext, BreadCrumbProvider };
