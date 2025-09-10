import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type DataPoint = { period: string; [key: string]: string | number };

const data: DataPoint[] = [
  { period: "W1", team: 44, support: 22, sla: 72 },
  { period: "W2", team: 58, support: 78, sla: 34 },
  { period: "W3", team: 43, support: 63, sla: 36 },
  { period: "W4", team: 48, support: 64, sla: 58 },
];

const config: ChartConfig = {
  team: { label: "Team", color: "#A79BFF" },
  support: { label: "Support", color: "#FFB5B0" },
  sla: { label: "SLA", color: "#4FD3D9" },
};

const keys = Object.keys(config);

export function AvgResolutionBar({
  id = "avg-resolution-bar",
  height = 120,
}: {
  id?: string;
  height?: number;
}) {
  return (
    <ChartContainer
      id={id}
      config={config}
      className="w-full"
      style={{ height, aspectRatio: "auto" }}
    >
      <BarChart data={data} barGap={2} margin={{ top: 8, right: 8, left: 8 }}>
        <CartesianGrid vertical={false} />

        <XAxis dataKey="period" height={12} hide />
        <YAxis width={12} />

        <Tooltip content={<ChartTooltipContent />} />

        {/* <Legend verticalAlign="bottom" content={<ChartLegendContent />} /> */}

        {keys.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            name={key}
            fill={`var(--color-${key})`}
            barSize={12}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}

export default AvgResolutionBar;
