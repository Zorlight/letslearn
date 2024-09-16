import { TabContext, TabContextType } from "@/provider/TabProvider";
import { useContext } from "react";

// Custom hook for accessing the TabContext safely
export const useTab = <T,>() => {
  const context = useContext(TabContext) as TabContextType<T>;
  return context;
};
