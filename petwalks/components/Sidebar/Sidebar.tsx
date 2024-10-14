import { Logo } from "@/components/Logo";
import SidebarRoutes from "../SidebarRoutes/SidebarRoutes";

export  default function Sidebar() {
  return (
    <div className="h-screen ">
      <div className="h-full flex flex-col border-r">
       
       <div>

       <Logo/>
       </div>
        <SidebarRoutes />
      </div>
    </div>
  );
}
