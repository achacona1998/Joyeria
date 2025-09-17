import { Layout } from "../../layout/Layout";
import { Engagement } from "./sections/EngagementTable";
import { KPI } from "./sections/KPI";
import { Revenue } from "./sections/RevenueChart";
import { TablaDeDatos } from "./sections/TablaDeDatos";

export default function Dashboard() {
  return (
    <Layout>
      <div className="p-6 pt-20 min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-white">
        <h1 className="mb-6 text-2xl font-bold">Analytics Dashboard</h1>
        <KPI />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TablaDeDatos />
          <Revenue />
        </div>
        <Engagement />
      </div>
    </Layout>
  );
}
