"use client";

import { navigation } from "@/lib/const";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavAction = () => {
  const pathname = usePathname();

  const route = navigation.map((item) => ({
    href: item.toLowerCase(),
    name: item,
    active: pathname === `/${item.toLowerCase()}`,
  }));
  return (
    <ul className="flex items-center space-x-8">
      {route.map((item) => (
        <li
          className={cn(
            "hover:underline transition text-neutral-600",
            item.active && "underline text-black"
          )}
          key={item.name}
        >
          <Link href={item.href}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};
