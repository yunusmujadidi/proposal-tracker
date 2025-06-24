import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { SidebarNav } from "./sidebar-navigation";
import { SidebarFooter } from "./sidebar-footer";
import { SidebarHeader } from "./sidebar-header";

export const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarNav />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
