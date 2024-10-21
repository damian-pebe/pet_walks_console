"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { FormCreateCustomer } from "../FormCreateCustomer";
export function HeaderCompanies() {
  const [openModalCreate, setopenModalCreate] = useState(false);
  return (
    <div className="flex  justify-between items-center">
      <h2 className="text-2xl">List of companies</h2>
      <Dialog open={openModalCreate} onOpenChange={setopenModalCreate}>
        <DialogTrigger asChild>
          <Button>Create Company</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px] ">
          <DialogHeader>
            <DialogTitle>Create Customer</DialogTitle>
            <DialogDescription>
              Create and configure your Customer
            </DialogDescription>
          </DialogHeader>
          {/* <FormCreateCustomer/> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
