"use client";

import { CustomIcon } from "@/components/CustomIcon";
import { HeartHandshake } from "lucide-react";
import { TableChats } from "./Components/TableChats";

export default function Reports() {
  return (
    <div className="justify-between ">
      <div className="pb-4 ">

      <div className="shadow-sm bg-background rounded-lg p-2 hover:shadow-lg transition">
        <div className="flex gap-x-2 items-center ">
          <CustomIcon icon={HeartHandshake} />
          <h1 className="text-2xl">Agreement</h1>
        </div>
      </div>
      </div>

      <div className="shadow-sm bg-background rounded-lg p-2 hover:shadow-lg transition">
        <TableChats />
      </div>
    </div>
  );
}
