import { Building2 } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarHeader as SidebarHeaderUI,
} from "../ui/sidebar";

export const SidebarHeader = () => {
  return (
    <SidebarHeaderUI className="mt-6">
      <SidebarMenu>
        <SidebarMenuButton>
          <div className="p-2 m-0 flex aspect-square size-8 items-center justify-center rounded-lg bg-black text-white">
            <Building2 className="size-4" />
          </div>
          <div className="grid flex-1">
            <div className="font-semibold leading-tight">Proposal Tracker</div>
            <div className="text-xs text-muted-foreground">
              Proposal tracking app
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarMenu>
    </SidebarHeaderUI>
  );
};
