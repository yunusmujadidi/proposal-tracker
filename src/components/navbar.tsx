import { Navigation } from "./navigation";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-center gap-2 p-4 m-2">
      <SidebarTrigger />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <Navigation />
    </div>
  );
};
