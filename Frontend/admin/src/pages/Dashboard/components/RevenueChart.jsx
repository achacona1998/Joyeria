import { LineChart } from "@tremor/react";

// eslint-disable-next-line react/prop-types
export function RevenueChart({ data }) {
  return (
    <LineChart
      className=" dark:text-white"
      data={data}
      index="month"
      categories={["Revenue", "Cadena"]}
      colors={["green", "red"]}
      yAxisWidth={50}
      
    />
  );
}
