import { PieChart, Pie, Cell, Tooltip, Legend, Label } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

type Slice = { type: string; value: number };

const data: Slice[] = [
  { type: "Photos", value: 193.19 },
  { type: "Videos", value: 222.6 },
  { type: "Articles", value: 176.85 },
  { type: "Audio", value: 103.37 },
  { type: "Documents", value: 198.97 },
];

const config: ChartConfig = {
  Photos: { label: "Photos", color: "#7c6cff" },
  Videos: { label: "Videos", color: "#ff8b8b" },
  Articles: { label: "Articles", color: "#3dd3e0" },
  Audio: { label: "Audio", color: "#ffb86b" },
  Documents: { label: "Documents", color: "#94f2a7" },
};

export default function AvgResponseDonut({
  id = "avg-response-donut",
  height = 240,
}: {
  id?: string;
  height?: number;
}) {
  type LabelProps = {
    cx: number;
    cy: number;
    midAngle: number;
    outerRadius: number;
    payload: Slice;
  };

  const renderOuterLabel = (props: LabelProps) => {
    const { cx, cy, midAngle, outerRadius, payload } = props;
    const RADIAN = Math.PI / 180;
    const angle = -midAngle;
    const cos = Math.cos(angle * RADIAN);
    const sin = Math.sin(angle * RADIAN);

    const sx = cx + (outerRadius + 8) * cos; // start of pointer (on arc)
    const sy = cy + (outerRadius + 8) * sin;
    const mx = cx + (outerRadius + 28) * cos; // middle joint
    const my = cy + (outerRadius + 28) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 28; // end x for text anchor
    const ey = my;

    const name = payload.type as keyof typeof config;
    const color = (config[name] && config[name].color) || "#888";

    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <polyline
          points={`${sx},${sy} ${mx},${my} ${ex},${ey}`}
          stroke={color}
          fill="none"
          strokeWidth={1}
        />
        <circle cx={ex} cy={ey} r={3} fill={color} />
        <text
          x={ex + (cos >= 0 ? 8 : -8)}
          y={ey - 4}
          textAnchor={textAnchor}
          fontSize={12}
          fill="#374151"
        >
          {payload.type}
        </text>
        <text
          x={ex + (cos >= 0 ? 8 : -8)}
          y={ey + 12}
          textAnchor={textAnchor}
          fontSize={12}
          fontWeight={700}
          fill={color}
        >
          {payload.value}
        </text>
      </g>
    );
  };

  // total shown in the donut center (matches the image)
  const total = data.reduce((s, d) => s + d.value, 0).toFixed(2);

  return (
    <div className="p-4 bg-white rounded border">
      <h3 className="text-sm font-medium mb-2">Average Response Time</h3>

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
            iconSize={6}
          />

          <Pie
            data={data}
            dataKey="value"
            nameKey="type"
            innerRadius={48}
            outerRadius={78}
            startAngle={90}
            endAngle={-270}
            paddingAngle={4}
            label={renderOuterLabel}
          >
            {data.map((entry) => (
              <Cell
                key={entry.type}
                fill={config[entry.type as keyof typeof config].color}
              />
            ))}
            <Label
              value={total}
              position="center"
              style={{ fontSize: 28, fontWeight: 700, fill: "#111" }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      <div className="mt-6">
        <div className="text-3xl font-extrabold text-gray-900">2h 15m</div>
        <div className="text-sm text-gray-500">Compared to last week</div>
      </div>
    </div>
  );
}
