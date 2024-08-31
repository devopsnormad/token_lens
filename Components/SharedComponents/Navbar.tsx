import Image from "next/image";
import Link from "next/link";

import { CiSearch } from "react-icons/ci";
import { RiCameraLensLine } from "react-icons/ri";

const Navbar = () => {
  return ( 
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="flex py-3 bg-gradient-to-r from-primary-50 via-primary-200 to-primary-300 justify-between items-center relative z-10">
        <Link href="/">
          <div className="flex space-x-3 items-center cursor-pointer">
          <RiCameraLensLine className="text-6xl text-white ml-3" />
            <h1 className="font-bold text-white text-xl ml-0">
              TOKENLENS
            </h1>
          </div>
        </Link>
        <div className="bg-white  mx-4 rounded-lg">
          <span className="flex items-center ">
            <input
              type="text"
              placeholder="Search"
              className="rounded-md px-2 py-2 w-60"
            />
            <CiSearch className="w-10 h-5" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
