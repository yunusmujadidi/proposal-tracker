import { SidebarMenu, SidebarHeader as SidebarHeaderUI } from "../ui/sidebar";
import Link from "next/link";
import Image from "next/image";

export const SidebarHeader = () => {
  return (
    <SidebarHeaderUI className="mt-6">
      <SidebarMenu>
        <Link href="/" className="flex justify-center items-center w-full">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={180}
            height={30}
            className="object-contain max-w-full h-auto"
          />
        </Link>
      </SidebarMenu>
    </SidebarHeaderUI>
  );
};
