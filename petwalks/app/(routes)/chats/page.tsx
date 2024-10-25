"use client";

import { CustomIcon } from "@/components/CustomIcon";
import { TableChats } from "@/app/(routes)/chats/Components/TableChats";
import { MessageCircleCodeIcon } from "lucide-react";

export default function chats() {
  return (
    <div className="justify-between ">
      <div className="pb-4 ">

      <div className="shadow-sm bg-background rounded-lg p-2 hover:shadow-lg transition">
        <div className="flex gap-x-2 items-center ">
          <CustomIcon icon={MessageCircleCodeIcon} />
          <h1 className="text-2xl">Chats</h1>
        </div>
      </div>
      </div>

      <div className="shadow-sm bg-background rounded-lg p-2 hover:shadow-lg transition">
        <TableChats />
      </div>
    </div>
  );
}
