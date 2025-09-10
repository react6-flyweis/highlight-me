import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const data = [
  { week: "W1", team: 44, support: 22, sla: 72 },
  { week: "W2", team: 58, support: 78, sla: 34 },
  { week: "W3", team: 43, support: 63, sla: 36 },
  { week: "W4", team: 48, support: 64, sla: 58 },
];

const config: ChartConfig = {
  team: { label: "Team", color: "#A79BFF" },
  support: { label: "Support", color: "#FFB5B0" },
  sla: { label: "SLA", color: "#4FD3D9" },
};

const keys = Object.keys(config);

export default function TicketVolumeBar() {
  return (
    <div className="p-4 bg-white rounded border">
      <h3 className="text-sm font-medium mb-2">Ticket Volume by Week</h3>
      <ChartContainer
        config={config}
        style={{
          height: 200,
        }}
        className="w-full"
      >
        <BarChart data={data} barGap={2} margin={{ top: 8, right: 8, left: 8 }}>
          <CartesianGrid vertical={false} />

          <XAxis dataKey="week" height={12} hide />
          <YAxis width={12} />

          <Tooltip content={<ChartTooltipContent />} />

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
    </div>
  );
}
