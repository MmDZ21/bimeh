import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const SearchBar = () => {
  return (
    <div className="w-full flex-1">
      <form>
        <div className="relative">
          <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-foreground" />
          <Input
            type="search"
            placeholder="جستجو ..."
            className="w-full placeholder:text-foreground appearance-none bg-background pr-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
