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

type DataPoint = {
  month: string;
  "2020": number;
  "2021": number;
  "2022": number;
};

// Small dataset that matches the screenshot: a spike in the first month, then near-zero points
const data: DataPoint[] = [
  { month: "Jan", "2020": 50, "2021": 60, "2022": 55 },
  { month: "Feb", "2020": 0, "2021": 0, "2022": 0 },
  { month: "Mar", "2020": 0, "2021": 0, "2022": 0 },
  { month: "Apr", "2020": 0, "2021": 0, "2022": 0 },
  { month: "May", "2020": 0, "2021": 0, "2022": 0 },
  { month: "Jun", "2020": 0, "2021": 0, "2022": 0 },
  { month: "Jul", "2020": 0, "2021": 0, "2022": 0 },
  { month: "Aug", "2020": 0, "2021": 0, "2022": 0 },
];

// Configure colors so ChartContainer will inject CSS variables --color-2020 etc.
const config: ChartConfig = {
  "2020": { label: "2020", color: "#7c6cff" },
  "2021": { label: "2021", color: "#ff8b8b" },
  "2022": { label: "2022", color: "#3dd3e0" },
};

export function ActiveUsersLine({
  id = "active-line",
  height = 120,
}: {
  id?: string;
  height?: number;
}) {
  // unique prefix for defs so multiple charts won't conflict
  const unique = React.useId();
  const defsPrefix = `${id}-${unique}`;

  return (
    <ChartContainer
      id={id}
      config={config}
      className="w-full mt-2"
      style={{ height, aspectRatio: "auto" }}
    >
      <LineChart
        height={height}
        data={data}
        margin={{
          left: 10,
          top: 10,
          right: 10,
        }}
      >
        <defs>
          <linearGradient
            id={`grad-${defsPrefix}-2020`}
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="var(--color-2020)"
              stopOpacity="0.18"
            />
            <stop offset="100%" stopColor="var(--color-2020)" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id={`grad-${defsPrefix}-2021`}
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="var(--color-2021)"
              stopOpacity="0.14"
            />
            <stop offset="100%" stopColor="var(--color-2021)" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id={`grad-${defsPrefix}-2022`}
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="var(--color-2022)"
              stopOpacity="0.14"
            />
            <stop offset="100%" stopColor="var(--color-2022)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <CartesianGrid />
        <XAxis dataKey="month" label={<p>User</p>} />
        <YAxis hide />
        <Tooltip />
        <Legend verticalAlign="bottom" />

        <Area
          type="monotone"
          dataKey="2020"
          stroke="none"
          fill={`url(#grad-${defsPrefix}-2020)`}
        />
        <Area
          type="monotone"
          dataKey="2021"
          stroke="none"
          fill={`url(#grad-${defsPrefix}-2021)`}
        />
        <Area
          type="monotone"
          dataKey="2022"
          stroke="none"
          fill={`url(#grad-${defsPrefix}-2022)`}
        />

        {/* Lines with hollow white-filled markers */}
        <Line
          type="monotone"
          dataKey="2020"
          stroke="var(--color-2020)"
          strokeWidth={2}
          dot={{
            r: 3,
            stroke: "var(--color-2020)",
            strokeWidth: 3,
            fill: "#fff",
          }}
          activeDot={{ r: 4 }}
        />

        <Line
          type="monotone"
          dataKey="2021"
          stroke="var(--color-2021)"
          strokeWidth={2}
          dot={{
            r: 3,
            stroke: "var(--color-2021)",
            strokeWidth: 3,
            fill: "#fff",
          }}
          activeDot={{ r: 4 }}
        />

        <Line
          type="monotone"
          dataKey="2022"
          stroke="var(--color-2022)"
          strokeWidth={2}
          dot={{
            r: 3,
            stroke: "var(--color-2022)",
            strokeWidth: 3,
            fill: "#fff",
          }}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
