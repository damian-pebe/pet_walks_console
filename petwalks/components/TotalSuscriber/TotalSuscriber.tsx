"use client";
import { Percent } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from "recharts";
import { useState, useEffect } from "react";
import { CustomIcon } from "../CustomIcon";
import { fetchPremiumUsers } from "@/firebaseFunctions";

export function TotalSuscriber() {
  const [dataTotalSuscribers, setDataTotalSuscribers] = useState([
    { name: "Standard", value: 0, fill: "#8884d8" },
    { name: "Premium users", value: 0, fill: "#00C49F" },
  ]);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const { premium, standard } = await fetchPremiumUsers();

        // Update chart data
        setDataTotalSuscribers([
          { name: "Standard", value: standard, fill: "#8884d8" },
          { name: "Premium users", value: premium, fill: "#00C49F" },
        ]);
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };

    getUsersData(); 
  }, []); 

  return (
    <div className="mb-4 lg:mb-0 shadow-sm bg-background rounded-lg p-5 w-full xl:w-96 hover:shadow-lg transition ">
      <div className="flex gap-x-2 items-center mb-4">
        <CustomIcon icon={Percent} />
        <p className="text-xl">User Accounts</p>
      </div>
      <div className="w-full h-[200px] p-5">
        <ResponsiveContainer aspect={1} maxHeight={200}>
          <PieChart>
            <Pie
              dataKey="value"
              data={dataTotalSuscribers}
              outerRadius={80}
              labelLine={false}
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
