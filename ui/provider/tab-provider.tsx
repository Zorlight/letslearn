import { createContext, ReactNode, useEffect, useState } from "react";

// Generic Props Interface
interface Props<T> {
  initTab: T;
  children: ReactNode;
}

// Context Type
export type TabContextType<T> = {
  selectedTab: T;
  handleTabSelected: (tab: T) => void;
};

// Create a context with `null` as the initial value (to be checked when using it)
const TabContext = createContext<TabContextType<any> | null>(null);

// Provider component
const TabProvider = <T,>({ children, initTab }: Props<T>) => {
  const [selectedTab, setSelectedTab] = useState<T>(initTab);
  useEffect(() => {
    setSelectedTab(initTab);
  }, [initTab]);

  const handleTabSelected = (tab: T) => {
    setSelectedTab(tab);
  };

  const value = {
    selectedTab,
    handleTabSelected,
  };

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};

export { TabContext, TabProvider };
