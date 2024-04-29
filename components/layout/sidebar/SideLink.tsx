import { Route } from "@/types";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

const SideLink = ({
  route,
  classname,
}: {
  route: Route;
  classname: string;
}) => {
  const pathName = usePathname();
  return (
    <Link
      href={route.path}
      className={`flex items-center gap-3 rounded-lg px-4 py-4 text-muted-foreground transition-all hover:bg-[hsl(252,99%,62%)] hover:text-white ${
        pathName == route.path ? "text-primary" : ""
      } ${classname}`}
    >
      {<route.icon className="w-4 h-4" />}
      {route.label}
    </Link>
  );
};

export default SideLink;
