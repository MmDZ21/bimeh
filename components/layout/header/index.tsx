import React from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import Profile from "./Profile";

const Header = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-primary  z-50 px-4 lg:h-[60px] lg:px-6 sticky md:static top-0">
      <Navbar />
      <SearchBar />
      <Profile />
    </header>
  );
};

export default Header;
