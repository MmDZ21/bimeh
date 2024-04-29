import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Route } from "@/types";
import SideLink from "./SideLink";

const CollapsibleLink = ({
  route,
  classname,
}: {
  route: Route;
  classname: string;
}) => {
  return (
    <AccordionItem
      value={route.label}
      className={`border-0 text-muted-foreground hover:text-foreground ${classname}`}
    >
      <AccordionTrigger>
        <div
          className={`flex items-center gap-3 rounded-lg py-4 pr-4 transition-all hover:text-foreground`}
        >
          {<route.icon className="w-4 h-4 " />}
          {route.label}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {route.subroutes?.map((r) =>
          r.subroutes ? (
            <CollapsibleLink route={r} key={r.label} classname="pr-4" />
          ) : (
            <SideLink route={r} key={r.label} classname="pr-8" />
          )
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default CollapsibleLink;
