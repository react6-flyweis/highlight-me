import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", Login: 60, Signups: 45 },
  { name: "Feb", Login: 80, Signups: 70 },
  { name: "Mar", Login: 90, Signups: 85 },
  { name: "Apr", Login: 45, Signups: 60 },
  { name: "May", Login: 70, Signups: 55 },
  { name: "Jun", Login: 50, Signups: 95 },
];

export default function AvgResponseLine() {
  return (
    <div className="p-4 bg-white rounded border">
      <h3 className="text-sm font-medium mb-2">Average Response Time</h3>
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="linear" dataKey="Login" stroke="#60a5fa" />
            <Line type="linear" dataKey="Signups" stroke="#f472b6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
