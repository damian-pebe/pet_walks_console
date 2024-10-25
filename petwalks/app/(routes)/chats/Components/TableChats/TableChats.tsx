"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  MoreHorizontal,
  User,
  DogIcon,
  MessageCircleMoreIcon,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Chat, Message } from "./TableChats.types";
import { fetchChats } from "@/firebaseFunctions";
import ChatModal from "@/app/(routes)/chat/page";

export const columns: ColumnDef<Chat>[] = [
  {
    accessorKey: "user1",
    header: () => (
      <Button variant="ghost">
        Walker <User className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("user1")}</div>
    ),
  },
  {
    accessorKey: "user2",
    header: () => (
      <Button variant="ghost">
        Owner <DogIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("user2")}</div>
    ),
  },
  {
    accessorKey: "messages",
    header: () => (
      <Button variant="ghost">
        Message <MessageCircleMoreIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const messageObj = row.getValue("messages") as Message[]; // Cast to Message[]
      
      // Get the first message if it exists, otherwise use "No message available"
      const message = messageObj.length > 0 
        ? messageObj[0].m || "No message available" 
        : "No message available";
  
      return (
        <div>
          {message.length > 18 ? message.slice(0, 18) + "..." : message}
        </div>
      );
    },
  }
  ,
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>ACTIONS</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Owner</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => {}}>
                Lifetime ban
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
                1 month ban
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
                14 days ban
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>7 days ban</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>1 day ban</DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuLabel>Walker</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {}}>
                Lifetime ban
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
                1 month ban
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
                14 days ban
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>7 days ban</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>1 day ban</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export function TableChats() {
  const [data, setData] = React.useState<Chat[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const [selectedChatId, setSelectedChatId] = React.useState<string|null>(null);

  React.useEffect(() => {
    const loadChats = async () => {
      const chatsData = await fetchChats();
      console.log(chatsData);
      setData(chatsData);
      setLoading(false);
    };

    loadChats();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) return <div>Loading...</div>; // Show loading state

  const handleChatOpen = (id: string) => {
    setSelectedChatId(id); // Set the ID of the chat to display
    setModalOpen(true); // Open the dialog/modal
  };

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}> 
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>                  ))}
                  <Button
                    variant="ghost"
                    className="h-16 w-16 pt-2 ml-1"
                    onClick={() => handleChatOpen(row.original.id)} 
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ChatModal for displaying chat messages */}
      {selectedChatId && (
        <ChatModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)} // Close the modal
          chatId={selectedChatId} // Pass the currently selected chat ID
        />
      )}  
    </div>
  );
}