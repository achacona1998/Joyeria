import { engagementData } from "../components/const";
import { EngagementTable } from "../components/EngagementTable";

export function Engagement() {
  return (
    <div className="p-6 mt-6 bg-white rounded-lg shadow dark:bg-slate-500">
      <h2 className="mb-4 text-xl font-semibold">Engagement per Channel</h2>
      <EngagementTable data={engagementData} />
    </div>
  );
}
