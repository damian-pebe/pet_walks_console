"use client";

import { useState } from "react";
export function HeaderCompanies() {
  const [openModalCreate, setopenModalCreate] = useState(false);
  return (
      <div className=" pb-4">

      <div className="shadow-sm bg-background rounded-lg p-5 items-center justify-center hover:shadow-lg transition">
        <div className="flex gap-x-2 justify-center">
          <h1 className="text-4xl">COMPANIES </h1>

        </div>
      </div>
      </div>
  );
}
