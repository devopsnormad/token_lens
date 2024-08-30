import Image from "next/image";
import Link from "next/link";
import BLogo from "@/public/assets/Logo2.png";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return ( 
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="flex bg-gradient-to-r from-primary-50 via-primary-200 to-primary-300 justify-between items-center relative z-10">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Image src={BLogo} alt="Blockfuse Labs Logo" className="w-24" />
            <h1 className="font-bold text-white text-xl ml-0">
              TOKEN LENS
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
