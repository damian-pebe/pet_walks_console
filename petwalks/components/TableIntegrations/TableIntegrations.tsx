"use client";
import * as React from "react";
import { CheckCircle2, ChevronUp, XCircle } from "lucide-react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchWalks } from "@/firebaseFunctions";
import { formatPrice } from "@/lib/formatPrice";
import { CustomIcon } from "../CustomIcon";
import { Walk } from "./TableIntegrations.types";

export const columns: ColumnDef<Walk>[] = [
  {
    accessorKey: "ownerEmail",
    header: "OWNER EMAIL",
    cell: ({ row }) => <div>{row.getValue("ownerEmail")}</div>,
  },
  {
    accessorKey: "payMethod",
    header: "PAY METHOD",
    cell: ({ row }) => <div>{row.getValue("payMethod")}</div>,
  },
  {
    accessorKey: "pets",
    header: "PETS",
    cell: ({ row }) => <div>{row.getValue("pets")}</div>,
  },
  {
    accessorKey: "premium",
    header:    ()=>   <div className="text-right justify-center">PREMIUM</div>,
    cell: ({ row }) => {
      const isPremium = row.getValue("premium") === "true"; // Assuming premium is a string
      return (
        <div className="text-left flex justify-end items-center">
          {isPremium ? <CheckCircle2 /> : <XCircle />}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="float-end px-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        PRICE
        <ChevronUp className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const price = row.getValue("price");
      return (
        <div className="text-right font-medium">
          {formatPrice(price as number)}
        </div>
      );
    },
  },
];

export default function TableIntegrations() {
  const [walksData, setWalksData] = React.useState<Walk[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  React.useEffect(() => {
    // Fetch walks data on component mount
    const loadWalks = async () => {
      const walks = await fetchWalks();
      setWalksData(walks as Walk[]);
    };
    loadWalks();
  }, []);

  const table = useReactTable({
    data: walksData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnVisibility },
  });

  return (
    <div className="w-full mt-5">
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
