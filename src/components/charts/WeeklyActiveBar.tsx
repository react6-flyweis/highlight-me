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

type DataPoint = { month: string; [key: string]: string | number };

const data: DataPoint[] = [
  { month: "Jan", "2020": 44, "2021": 21, "2022": 71 },
  { month: "Feb", "2020": 58, "2021": 78, "2022": 34 },
  { month: "Mar", "2020": 43, "2021": 63, "2022": 36 },
];

const config: ChartConfig = {
  "2020": { label: "2020", color: "#A79BFF" },
  "2021": { label: "2021", color: "#FFB5B0" },
  "2022": { label: "2022", color: "#4FD3D9" },
};

const keys = Object.keys(config);

export function WeeklyActiveBar({
  id = "signups-bar",
  height = 160,
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
        <CartesianGrid vertical={false} />

        <XAxis dataKey="month" height={12} />
        <YAxis width={12} />

        <Tooltip content={<ChartTooltipContent />} />

        <Legend verticalAlign="bottom" content={<ChartLegendContent />} />

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
