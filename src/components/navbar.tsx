import { navigation } from "@/lib/const";
import Link from "next/link";
import { NavAction } from "./nav-action";

export const Navbar = () => {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 lg:px-0 flex h-20 items-center lg:justify-between">
          <Link href="/">
            <p className="font-semibold text-2xl tracking-tight">
              Proposal Tracker
            </p>
          </Link>

          <div className="ml-auto lg:ml-0">
            <NavAction />
          </div>
        </div>
      </div>
    </nav>
  );
};
