"use client";
import { routes } from "@/constants";
import React from "react";
import SideLink from "./SideLink";
import CollapsibleLink from "./CollapsibleLink";
import { Accordion } from "@/components/ui/accordion";

const Items = () => {
  return (
    <div className="flex-1">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        <Accordion type="multiple">
          {routes.map((route) =>
            route.subroutes ? (
              <CollapsibleLink route={route} key={route.label} classname="" />
            ) : (
              <SideLink route={route} key={route.label} classname="" />
            )
          )}
        </Accordion>
      </nav>
    </div>
  );
};

export default Items;
