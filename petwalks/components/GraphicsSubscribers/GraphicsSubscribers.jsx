"use client";

import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
} from "recharts";
import { fetchTypeWalks } from "./GraphicsSubscribers.data";

export default function GraphicsSubscribers() {
  const [dataGraphics, setDataGraphics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rise, setRise] = useState(true);
  const [percentChange, setPercentChange] = useState(0);
  const [firstDay, setFirstDay] = useState(0);
  const [lastDay, setLlastDay] = useState(0);
  const [difference, setDifference] = useState(0);

  function dif() {
    setDifference(firstDay + lastDay);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTypeWalks();
        const formattedData = data.distributors.map((item) => ({
          dayMonth: item.t.toDate,
          travel: item.travel,
          walk: item.walk,
        }));

        setDataGraphics(formattedData);

        if (formattedData.length > 1) {
          const firstValue = formattedData[0].travel + formattedData[0].walk;
          setFirstDay(firstValue);
          const lastValue =
            formattedData[formattedData.length - 1].travel +
            formattedData[formattedData.length - 1].walk;
          setLlastDay(lastValue);
          const change = ((lastValue - firstValue) / firstValue) * 100; 

          setPercentChange(Math.abs(change)); 

          setRise(lastValue > firstValue); 
        }
        dif()
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  return (
    <div className="mt-5">
      <div className="flex gap-x-5 mb-5">
        <div className="flex items-center gap-2 px-3 text-md bg-[#16C8C7] text-white rounded-xl w-fit">
          {percentChange.toFixed(2)}%
          {rise && <TrendingUp strokeWidth={1} className="h-8 w-8" />}
          {!rise && <TrendingDown strokeWidth={1} className="h-8 w-8" />}{" "}
        </div>
        
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={730}
            height={250}
            data={dataGraphics} // Use the fetched data for the chart
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#887CFD" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#887CFD" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="dayMonth" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="travel"
              stroke="#887CFD"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="walk"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
