import { LineChart, Line, XAxis, YAxis, CartesianGrid, Area } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  type ChartConfig,
} from "@/components/ui/chart";
import * as React from "react";

type DataPoint = { day: string; Likes: number; Shares: number };

const data: DataPoint[] = [
  { day: "Week 1", Likes: 82, Shares: 60 },
  { day: "Week 2", Likes: 90, Shares: 82 },
  { day: "Week 3", Likes: 92, Shares: 88 },
  { day: "Week 4", Likes: 36, Shares: 86 },
  { day: "Week 5", Likes: 74, Shares: 52 },
  { day: "Week 6", Likes: 48, Shares: 10 },
  { day: "Week 7", Likes: 34, Shares: 98 },
];

const config: ChartConfig = {
  Likes: { label: "Avg Likes", color: "#7c6cff" },
  Shares: { label: "Avg Shares", color: "#ff8b8b" },
};

export function ContestEngagementLine({
  id = "Likes-Shares-line",
  height = 220,
}: {
  id?: string;
  height?: number;
}) {
  const unique = React.useId();
  const defsPrefix = `${id}-${unique}`;

  return (
    <ChartContainer
      id={id}
      config={config}
      className="w-full"
      style={{ height }}
    >
      <LineChart
        data={data}
        margin={{ left: 10, top: 10, right: 10, bottom: 10 }}
      >
        <defs>
          <linearGradient
            id={`grad-${defsPrefix}-Likes`}
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="var(--color-Likes)"
              stopOpacity={0.18}
            />
            <stop
              offset="100%"
              stopColor="var(--color-Likes)"
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient
            id={`grad-${defsPrefix}-Shares`}
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="var(--color-Shares)"
              stopOpacity={0.14}
            />
            <stop
              offset="100%"
              stopColor="var(--color-Shares)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={true} horizontal={true} />
        <XAxis dataKey="day" />
        <YAxis width={15} />
        <ChartTooltip />
        <ChartLegend verticalAlign="bottom" height={20} />

        <Area
          type="linear"
          dataKey="Likes"
          stroke="none"
          fill={`url(#grad-${defsPrefix}-Likes)`}
        />
        <Area
          type="linear"
          dataKey="Shares"
          stroke="none"
          fill={`url(#grad-${defsPrefix}-Shares)`}
        />

        <Line
          type="linear"
          dataKey="Likes"
          stroke="var(--color-Likes)"
          strokeWidth={2}
          dot={{
            r: 5,
            stroke: "var(--color-Likes)",
            strokeWidth: 3,
            fill: "#fff",
          }}
          activeDot={{ r: 6 }}
        />

        <Line
          type="linear"
          dataKey="Shares"
          stroke="var(--color-Shares)"
          strokeWidth={2}
          dot={{
            r: 5,
            stroke: "var(--color-Shares)",
            strokeWidth: 3,
            fill: "#fff",
          }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
