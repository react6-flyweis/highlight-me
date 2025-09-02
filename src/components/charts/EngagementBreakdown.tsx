import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

type DataPoint = { day: string; [key: string]: string | number };

const data: DataPoint[] = [
  { day: "Mon", "2020": 85, "2021": 25, "2022": 88 },
  { day: "Tue", "2020": 58, "2021": 64, "2022": 38 },
  { day: "Wed", "2020": 20, "2021": 42, "2022": 81 },
  { day: "Thu", "2020": 78, "2021": 15, "2022": 63 },
  { day: "Fri", "2020": 58, "2021": 64, "2022": 46 },
  { day: "Sat", "2020": 20, "2021": 62, "2022": 95 },
  { day: "Sun", "2020": 33, "2021": 60, "2022": 47 },
];

const config: ChartConfig = {
  "2020": { label: "2020", color: "#A79BFF" },
  "2021": { label: "2021", color: "#FFB5B0" },
  "2022": { label: "2022", color: "#4FD3D9" },
};

const keys = Object.keys(config);

export function EngagementBreakdown({
  id = "engagement-breakdown",
  height = 260,
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
      <BarChart
        data={data}
        barGap={0}
        margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
      >
        <CartesianGrid />

        <XAxis dataKey="day" height={24} />
        <YAxis width={20} />

        <Tooltip content={<ChartTooltipContent />} />

        <Legend verticalAlign="bottom" content={<ChartLegendContent />} />

        {keys.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            name={key}
            fill={`var(--color-${key})`}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}
