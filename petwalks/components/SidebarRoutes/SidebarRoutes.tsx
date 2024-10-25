"use client";
import SidebarItem from "../SidebarItem/SidebarItem";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { dataGeneralSidebar, dataToolsSidebar } from "./SidebarRoutes.data";
export default function SidebarRoutes() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="p-2 md:p-6">
          <p className="text-slate-500 mb-2">GENERAL</p>
          {dataGeneralSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>
        <Separator />
        <div className="p-2 md:p-6">
          <p className="text-slate-500 mb-2">TOOLS</p>
          {dataToolsSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>
        <Separator />
      </div>

      <div>
        <Separator />

        <footer className="mt-3 p-3 text-center">
          <h1>Everything your pet needs in one place</h1>
          
        </footer>

      </div>

    </div>
  );
}
