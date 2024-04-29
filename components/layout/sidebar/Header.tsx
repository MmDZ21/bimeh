import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex h-14 items-center md:bg-primary md:text-white border-b-primary border-b md:border-b-0 md:border-l md:border-l-white justify-center px-4 lg:h-[60px] lg:px-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <span className="">سامانه حسابداری بیمه</span>
      </Link>
    </div>
  );
};

export default Header;
