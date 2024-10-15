import { CustomIcon } from "../CustomIcon";
import { BarChart } from "lucide-react";
import GraphicsSubscribers from "../GraphicsSubscribers/GraphicsSubscribers";

export default function Walkdistributor() {
  return (
    <div className="shadow-sm bg-background rounded-lg p-5 ">
      <div className="flex gap-x-2 items-center">
        <CustomIcon icon={BarChart} />
        <p className="text-xl">Walks distribution</p>
      </div>
      <GraphicsSubscribers/>
    </div>
  );
}
