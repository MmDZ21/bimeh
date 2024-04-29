import React from "react";
import Header from "./Header";
import Items from "./Items";
import Footer from "./Footer";

const Sidebar = () => {
  return (
    <div className="hidden border-l border-primary bg-white md:block">
      <div className="flex h-full flex-col gap-2">
        <Header />
        <Items />
        <Footer />
      </div>
    </div>
  );
};

export default Sidebar;
