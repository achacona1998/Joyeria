import { kpiData } from "../components/const";
import { KPICard } from "../components/KPICard";

export function KPI() {
  return (
    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3 ">
      {kpiData.map((kpi, index) => (
        <KPICard
          key={index}
          title={kpi.title}
          value={kpi.value}
          description={kpi.description}
        />
      ))}
    </div>
  );
}
