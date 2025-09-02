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

type DataPoint = {
  category: string;
  "2020": number;
  "2021": number;
  "2022": number;
};

const data: DataPoint[] = [
  { category: "Travel", "2020": 20, "2021": 55, "2022": 85 },
  { category: "Tech", "2020": 30, "2021": 40, "2022": 92 },
  { category: "Food", "2020": 10, "2021": 70, "2022": 60 },
  { category: "Art", "2020": 15, "2021": 20, "2022": 40 },
];

const config: ChartConfig = {
  "2020": { label: "2020", color: "#A79BFF" },
  "2021": { label: "2021", color: "#FFB5B0" },
  "2022": { label: "2022", color: "#4FD3D9" },
};

export function TopCategoriesHorizontalBar({
  id = "top-cats-bar",
  height = 200,
}: {
  id?: string;
  height?: number;
}) {
  const keys = Object.keys(config);

  return (
    <ChartContainer
      id={id}
      config={config}
      className="w-full"
      style={{ height, aspectRatio: "auto" }}
    >
      <BarChart
        layout="vertical"
        data={data}
        barGap={0}
        margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
      >
        <CartesianGrid />
        <XAxis type="number" axisLine={false} tickLine />
        <YAxis dataKey="category" type="category" width={30} />

        <Tooltip content={<ChartTooltipContent />} />

        <Legend verticalAlign="bottom" content={<ChartLegendContent />} />

        {keys.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            name={key}
            fill={`var(--color-${key})`}
            barSize={10}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}
