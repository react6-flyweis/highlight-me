import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Tooltip,
  Legend,
} from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import * as React from "react";

type DataPoint = { day: string; Sent: number; Clicks: number };

const data: DataPoint[] = [
  { day: "Mon", Sent: 820, Clicks: 60 },
  { day: "Tue", Sent: 900, Clicks: 82 },
  { day: "Wed", Sent: 920, Clicks: 188 },
  { day: "Thu", Sent: 360, Clicks: 86 },
  { day: "Fri", Sent: 740, Clicks: 152 },
  { day: "Sat", Sent: 480, Clicks: 110 },
  { day: "Sun", Sent: 340, Clicks: 98 },
];

const config: ChartConfig = {
  Sent: { label: "Notifications Sent", color: "#06b6d4" },
  Clicks: { label: "Clicks", color: "#f59e0b" },
};

export function NotificationPerformanceLine({
  id = "notification-performance-line",
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
            id={`grad-${defsPrefix}-Sent`}
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="var(--color-Sent)"
              stopOpacity={0.18}
            />
            <stop offset="100%" stopColor="var(--color-Sent)" stopOpacity={0} />
          </linearGradient>
          <linearGradient
            id={`grad-${defsPrefix}-Clicks`}
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="var(--color-Clicks)"
              stopOpacity={0.14}
            />
            <stop
              offset="100%"
              stopColor="var(--color-Clicks)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={true} horizontal={true} />
        <XAxis dataKey="day" />
        <YAxis width={15} />
        <Tooltip />
        <Legend verticalAlign="bottom" height={20} />

        <Area
          type="monotone"
          dataKey="Sent"
          stroke="none"
          fill={`url(#grad-${defsPrefix}-Sent)`}
        />
        <Area
          type="monotone"
          dataKey="Clicks"
          stroke="none"
          fill={`url(#grad-${defsPrefix}-Clicks)`}
        />

        <Line
          type="linear"
          dataKey="Sent"
          stroke="var(--color-Sent)"
          strokeWidth={2}
          dot={{
            r: 5,
            stroke: "var(--color-Sent)",
            strokeWidth: 3,
            fill: "#fff",
          }}
          activeDot={{ r: 6 }}
        />

        <Line
          type="linear"
          dataKey="Clicks"
          stroke="var(--color-Clicks)"
          strokeWidth={2}
          dot={{
            r: 5,
            stroke: "var(--color-Clicks)",
            strokeWidth: 3,
            fill: "#fff",
          }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
