"use client";
import { useBreadCrumb } from "@/hooks/useBreadCrumb";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { useMemo } from "react";

const CustomBreadCrumb = () => {
  const context = useBreadCrumb();
  const { currentRoute } = context;

  const routes = useMemo(() => {
    return currentRoute.split("/").filter((route) => route !== "");
  }, [currentRoute]);

  return (
    <Breadcrumbs
      color="primary"
      underline="hover"
      maxItems={4}
      itemsBeforeCollapse={2}
      itemsAfterCollapse={2}
      size="lg"
    >
      {routes.map((route, index) => {
        // Create a new href by joining the routes up to the current index
        const href = "/" + routes.slice(0, index + 1).join("/");
        const isLast = index === routes.length - 1;
        return (
          <BreadcrumbItem
            key={index}
            href={href}
            color={isLast ? "secondary" : "primary"}
          >
            {route}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
};

export default CustomBreadCrumb;
