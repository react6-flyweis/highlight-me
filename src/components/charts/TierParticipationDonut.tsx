import { PieChart, Pie, Tooltip, Cell, Legend, Label } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

type Slice = { tier: string; value: number };

const data: Slice[] = [
  { tier: "Gold", value: 180 },
  { tier: "Silver", value: 145 },
  { tier: "Bronze", value: 76 },
];

const config: ChartConfig = {
  Gold: { label: "Gold", color: "#7c6cff" },
  Silver: { label: "Silver", color: "#ff8b8b" },
  Bronze: { label: "Bronze", color: "#3dd3e0" },
};

export function TierParticipationDonut({
  id = "tier-participation-donut",
  height = 200,
}: {
  id?: string;
  height?: number;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <ChartContainer
      id={id}
      config={config}
      className="w-full"
      style={{ height }}
    >
      <PieChart
        height={height}
        margin={{
          top: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <Tooltip />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          iconSize={4}
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="tier"
          innerRadius={58}
          outerRadius={78}
          startAngle={90}
          endAngle={-270}
          paddingAngle={4}
          labelLine={false}
        >
          <Label
            value={total.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
            position="center"
            style={{ fontSize: 26, fontWeight: 700, fill: "#111" }}
          />
          {data.map((entry) => (
            <Cell
              key={entry.tier}
              fill={config[entry.tier as keyof typeof config].color}
            />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
