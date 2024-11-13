
import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="flex justify-between p-4 font-poppins md:px-8 md:gap-2">
      <Image src="/Kreatoors Logo.svg" alt="Kreatoors Logo" className="w-10 h-10" width={200} height={200} />
      <button className="text-base py-2.5 px-4 text-white bg-[rgba(68,68,68,1)] rounded-3xl">
      Get Started
     </button>
    </header>
  );
};

export default Navbar;
