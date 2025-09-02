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

type DataPoint = { day: string; Login: number; Signups: number };

const data: DataPoint[] = [
  { day: "Mon", Login: 82, Signups: 60 },
  { day: "Tue", Login: 90, Signups: 82 },
  { day: "Wed", Login: 92, Signups: 88 },
  { day: "Thu", Login: 36, Signups: 86 },
  { day: "Fri", Login: 74, Signups: 52 },
  { day: "Sat", Login: 48, Signups: 10 },
  { day: "Sun", Login: 34, Signups: 98 },
];

const config: ChartConfig = {
  Login: { label: "Login", color: "#7c6cff" },
  Signups: { label: "Signups", color: "#ff8b8b" },
};

export function LoginSignupsLine({
  id = "login-signups-line",
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
            id={`grad-${defsPrefix}-Login`}
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="var(--color-Login)"
              stopOpacity={0.18}
            />
            <stop
              offset="100%"
              stopColor="var(--color-Login)"
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient
            id={`grad-${defsPrefix}-Signups`}
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="var(--color-Signups)"
              stopOpacity={0.14}
            />
            <stop
              offset="100%"
              stopColor="var(--color-Signups)"
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
          dataKey="Login"
          stroke="none"
          fill={`url(#grad-${defsPrefix}-Login)`}
        />
        <Area
          type="monotone"
          dataKey="Signups"
          stroke="none"
          fill={`url(#grad-${defsPrefix}-Signups)`}
        />

        <Line
          type="linear"
          dataKey="Login"
          stroke="var(--color-Login)"
          strokeWidth={2}
          dot={{
            r: 5,
            stroke: "var(--color-Login)",
            strokeWidth: 3,
            fill: "#fff",
          }}
          activeDot={{ r: 6 }}
        />

        <Line
          type="linear"
          dataKey="Signups"
          stroke="var(--color-Signups)"
          strokeWidth={2}
          dot={{
            r: 5,
            stroke: "var(--color-Signups)",
            strokeWidth: 3,
            fill: "#fff",
          }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
