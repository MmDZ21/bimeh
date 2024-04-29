import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Link, Package2, Home } from "lucide-react";
import React from "react";
import Header from "../sidebar/Header";
import Items from "../sidebar/Items";
import Footer from "../sidebar/Footer";

const Navbar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <Header />
        <Items />
        <Footer />
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
