"use client";

import CardSummary from "../../../components/CardSummary/CardSummary";
import { LastCustomers } from "../../../components/LastCustomers/index";
import { UsersRound, Waypoints, BookOpenCheck } from "lucide-react";
import Walkdistributor from "@/components/Walkdistributor/Walkdistributor";
import { TotalSuscriber } from "@/components/TotalSuscriber";
import ListIntegrations from "@/components/ListIntegrations/ListIntegrations";


export default function Home() {
  
  return (
    <div>
      <div className="pb-8">
        <div className="shadow-sm bg-background rounded-lg p-5 items-center justify-center hover:shadow-lg transition">
          <div className="flex gap-x-2 justify-center">
            <h1 className="text-4xl">DASHBOARD </h1>
          </div>
        </div>
      </div>

    

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20">
        <CardSummary
          icon={UsersRound}
          total="12.450"
          average={15}
          title="Walk done"
          tooltipText="see all walks"
        />
        <CardSummary
          icon={Waypoints}
          total="12.450"
          average={25}
          title="Walk done"
          tooltipText="see all walks"
        />
        <CardSummary
          icon={BookOpenCheck}
          total="12.450"
          average={15}
          title="Walk done"
          tooltipText="see all walks"
        />
      </div>

      <div className="grid grid-cols-1 mt-12 xl:grid-cols-2 md:gap-x-10 gap-y-4">
        <LastCustomers />
        <Walkdistributor />
      </div>

      <div className="flex-col md:gap-x-10 xl:flex xl:flex-row gap-y-4 md:gap-y-0 mt-12 md:mb-10 justify-center">
        <TotalSuscriber />
        <ListIntegrations />
      </div>
    </div>
  );
}
