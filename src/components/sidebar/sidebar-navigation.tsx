"use client";
import { navigation } from "@/lib/const";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PlusCircleIcon } from "lucide-react";
import { useProposalSheet } from "@/hooks/use-proposal";

export const SidebarNav = () => {
  const { onOpen } = useProposalSheet();
  const pathname = usePathname();
  const route = navigation.map((item) => ({
    ...item,
    href: item.url,
    name: item.title,
    active: pathname === item.url,
  }));
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem className="my-5">
          <SidebarMenuButton
            onClick={() => onOpen()}
            tooltip="Tambah Proposal"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
          >
            <PlusCircleIcon className="size-4 bg-primary text-primary-foreground" />
            <span>Buat Proposal</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {route.map((item) => (
            <SidebarMenuItem key={item.name}>
              <Link href={item.href}>
                <SidebarMenuButton tooltip={item.name} isActive={item.active}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
