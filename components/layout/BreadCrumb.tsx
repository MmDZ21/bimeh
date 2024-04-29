"use client";
import React, { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { routes } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route } from "@/types";

const findRouteByPath = (path: string, routes: Route[]): Route | null => {
  const route = routes.find((r) => r.path === path);
  if (route) {
    return route;
  }
  for (const r of routes) {
    if (r.subroutes) {
      const subroute = findRouteByPath(path, r.subroutes);
      if (subroute) {
        return subroute;
      }
    }
  }
  return null;
};

const BreadCrumb = () => {
  const paths = usePathname();
  const pathnames = paths.split("/").filter((path) => path);
  let currentPath = "";
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnames.map((pathname, index) => {
          currentPath += `/${pathname}`;
          const title = findRouteByPath(currentPath, routes);
          const href = currentPath;
          return (
            <Fragment key={pathname}>
              <BreadcrumbItem>
                {index === pathnames.length - 1 ? (
                  <BreadcrumbPage className="text-primary">
                    {title?.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={href}
                    className="hover:text-primary"
                    asChild
                  >
                    <Link href={href}>{title?.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index !== pathnames.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
