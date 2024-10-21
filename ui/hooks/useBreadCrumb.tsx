import {
  BreadCrumbContext,
  BreadCrumbContextType,
} from "@/provider/breadcrumb-provider";
import { useContext } from "react";

// Custom hook for accessing the TabContext safely
export const useBreadCrumb = () => {
  const context = useContext(BreadCrumbContext) as BreadCrumbContextType;
  return context;
};
