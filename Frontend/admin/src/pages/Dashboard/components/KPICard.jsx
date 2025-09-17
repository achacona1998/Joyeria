import { Card, Metric, Text } from "@tremor/react";

// eslint-disable-next-line react/prop-types
export function KPICard({ title, value, description }) {
  return (
    <Card className="dark:bg-slate-500">
      <Text>{title}</Text>
      <Metric>{value}</Metric>
      <Text>{description}</Text>
    </Card>
  );
}
