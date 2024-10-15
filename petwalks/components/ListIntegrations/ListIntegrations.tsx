import { CustomIcon } from "../CustomIcon";
import { List } from "lucide-react";
import TableIntegrations from "../TableIntegrations/TableIntegrations";
export default function ListIntegrations() {
  return (
    <div className="shadoww-sm bg-background rounded-lg p-5 flex-1">
      <div className="flex gap-x-2 items-center">
        <CustomIcon icon={List} />
        <p className="text-xl">List Integrations</p>
      </div>
      <TableIntegrations />
    </div>
  );
}
