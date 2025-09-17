import { revenueData } from "../components/const";
import { RevenueChart } from "../components/RevenueChart";

export function Revenue() {
  return (
    <div className="p-6 bg-white rounded-lg shadow dark:bg-slate-500">
      <h2 className="mb-4 text-xl font-semibold">Revenue Trends</h2>
      <RevenueChart data={revenueData} />
    </div>
  );
}
