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
  RectangleEllipsisIcon,
  SendHorizontalIcon,
  FlagTriangleRightIcon,
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
import {
  fetchAddressProofByEmail,
  fetchAgreement,
  fetchINEByEmail,
  updateUserDocs,
} from "@/firebaseFunctions";
import { POST } from "@/app/api/send/route";

const fetchDocumentINE = async (reported: string): Promise<string> => {
  const ine = await fetchINEByEmail(reported);
  return ine;
};
const fetchDocumentAdressProof = async (reported: string): Promise<string> => {
  const adressProof = await fetchAddressProofByEmail(reported);
  return adressProof;
};
const handleSendEmail = async (sender: string, text: string, status: string) => {
  try {
    await POST({
      txt: text,
      sender: sender,
    });
    await updateUserDocs(status, sender);
  } catch (error) {
    console.log(error);
  }
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "email",
    header: () => (
      <Button variant="ghost">
        Email <SendHorizontalIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "ine",
    header: () => (
      <Button variant="ghost">
        INE <FlagTriangleRightIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (

      <div>
        <Button variant="link"           onClick={() => window.open(row.getValue("addressProof"), "_blank")}
>
          INE <RectangleEllipsisIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "addressProof",
    header: () => (
      <Button variant="ghost">
        AddressProof <RectangleEllipsisIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (

      <div>
        <Button
          variant="link"
          onClick={() => window.open(row.getValue("addressProof"), "_blank")}
        >
          AddressProof <RectangleEllipsisIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
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
                  row.getValue("email"),
                  `Hi, We have reviewed your program joining request and we have decided to Accept it.\nThank you for been interested on our program, we wish you the best experience on this app.\nWelcome to Pet Walks Program,\nHave a good day.\nPet Walks.`,'verified'
                );
              }}
            >
              Accept
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSendEmail(
                  row.getValue("email"),
                  `Hi, We have reviewed your program joining request and we have decided to deny it.\nThank you for been interested on our program, we wish you the best experience on this app.\nWe found that the documents that you sent aren't valid or doesnt match.\nYou can send the request again and well check it\nHave a good day.\nPet Walks.`,
                   'unverified'
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

  React.useEffect(() => {
    const loadReports = async () => {
      const agreementData = await fetchAgreement();
      setData(agreementData);
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
    </div>
  );
}
