import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";

type Slice = { name: string; value: number };

const data: Slice[] = [
  { name: "Gold", value: 40 },
  { name: "Silver", value: 35 },
  { name: "Bronze", value: 25 },
];

const CONFIG = {
  Gold: { label: "Gold", color: "#7c6cff" },
  Silver: { label: "Silver", color: "#ff8b8b" },
  Bronze: { label: "Bronze", color: "#3dd3e0" },
};

export default function FeedbackCategoriesDonut() {
  // displayed center value from design
  const centerValue = "401.58";

  return (
    <div className="p-4 bg-white rounded border">
      <h3 className="text-sm font-medium mb-2">Feedback Categories</h3>

      <div className="w-full flex items-center">
        {/* chart area */}
        <div className="relative" style={{ width: 220, height: 160 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={65}
                outerRadius={80}
                // startAngle={90}
                // endAngle={-270}
                paddingAngle={4}
                labelLine={false}
              >
                <Label
                  value={centerValue}
                  position="center"
                  style={{ fontSize: 28, fontWeight: 700, fill: "#111" }}
                />
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={CONFIG[entry.name as keyof typeof CONFIG].color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* small subtitle under the number */}
          <div
            className="absolute left-0 right-0"
            style={{ top: "62%", textAlign: "center" }}
          >
            <div className="text-xs text-gray-500">Overall score</div>
          </div>
        </div>

        {/* legend */}
        <div className="ml-6 flex-1">
          <div className="flex flex-col gap-3 justify-center h-full">
            {data.map((d) => (
              <div key={d.name} className="flex items-center gap-3">
                <span
                  className="size-2 rounded-full"
                  style={{
                    background: CONFIG[d.name as keyof typeof CONFIG].color,
                  }}
                />
                <div className="text-sm text-gray-700">
                  {CONFIG[d.name as keyof typeof CONFIG].label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
