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
  RectangleEllipsisIcon,
  LucideArrowDownWideNarrow,
  ChevronRight,
  SendHorizontalIcon,
  FlagTriangleRightIcon,
  ShieldBan,
  ShieldX,
  ShieldAlert,
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
import { deleteReport, fetchAddressProofByEmail, fetchINEByEmail, fetchReports, newChat } from "@/firebaseFunctions";
import ChatModal from "@/app/(routes)/chat/page";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CustomToolTip from "@/components/CustomToolTip/CustomToolTip";
import { AcceptReportReqeust, POST } from "@/app/api/send/route";


const fetchDocumentINE = async (reported:string): Promise<string> => {
    const ine = await fetchINEByEmail(reported)
    return ine
 }
const fetchDocumentAdressProof = async (reported:string): Promise<string> => {
    const adressProof = await fetchAddressProofByEmail(reported)
    return adressProof
 }
const handleSendEmail = async (
  type: boolean,
  reported: string,
  sender: string
) => {
  let INE = "";
  let AdressProof = "";
  try {
    if (type) {
      INE = await fetchDocumentINE(reported);
      AdressProof = await fetchDocumentAdressProof(reported);
    }

    !type
      ? await POST({
          txt: `Hi, We have reviewed your report request about the user ${reported} and we have decided to deny it because we didn’t find the necessary information or proof of it. If you have more information, you can resend the request, and we’ll check it again. Have a good day.
      Pet Walks.`,
      sender: sender
        })
      : await AcceptReportReqeust({
          ine: INE,
          adressProof: AdressProof,
          sender: sender
        });


        await deleteReport(sender, reported);
  } catch (error) {
    console.log(error);
  }
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "sender",
    header: () => (
      <Button variant="ghost">
        Sender <SendHorizontalIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("sender")}</div>
    ),
  },
  {
    accessorKey: "reported",
    header: () => (
      <Button variant="ghost">
        Reported <FlagTriangleRightIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("reported")}</div>
    ),
  },
  {
    accessorKey: "reason",
    header: () => (
      <Button variant="ghost">
        Reason <RectangleEllipsisIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="items-center text-center">
        <CustomToolTip content={row.getValue("reason")} />
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: () => (
      <div className=" items-center text-center">
        <Button variant="ghost">
          Type <LucideArrowDownWideNarrow className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const type = row.getValue("type");
      return (
        <div className="items-center text-center">
          {type == "low" && (
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <ShieldBan strokeWidth={1} className="w-5 h-5" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <h2>{"LOW PRIORITY"}</h2>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
          {type == "mid" && (
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <ShieldX strokeWidth={1} className="w-5 h-5" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <h2>{"MID PRIORITY"}</h2>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
          {type == "high" && (
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <ShieldAlert strokeWidth={1} className="w-5 h-5" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <h2>{"HIGH PRIORITY"}</h2>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center">
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
            <DropdownMenuItem
              onClick={() => {
                handleSendEmail(
                  true,
                  row.getValue("reported"),
                  row.getValue("sender")
                );
              }}
            >
              Accept
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSendEmail(
                  false,
                  row.getValue("reported"),
                  row.getValue("sender")
                );
              }}
            >
              Deny
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

export function TableChats() {
  const [data, setData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [selectedChatId, setSelectedChatId] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    const loadReports = async () => {
      const reportsData = await fetchReports();
      setData(reportsData);
      setLoading(false);
    };
    loadReports();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) return <div>Loading...</div>;

  const handleChatOpen = async (
    sender: string,
    reported: string,
    chatId: string | null
  ) => {
    let chatIdToOpen = chatId;
    if (!chatIdToOpen) {
      chatIdToOpen = await newChat(sender, reported);
    }
    setSelectedChatId(chatIdToOpen);
    setModalOpen(true);
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
                    </TableCell>
                  ))}
                  <Button
                    variant="ghost"
                    className="h-16 w-16 pt-2 ml-1"
                    onClick={() =>
                      handleChatOpen(
                        row.original.sender,
                        row.original.reported,
                        row.original.chat
                      )
                    }
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

      {selectedChatId && (
        <ChatModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          chatId={selectedChatId}
        />
      )}
    </div>
  );
}
