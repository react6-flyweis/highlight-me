import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type ActivityItem = {
  id?: string | number;
  title: string;
  type: string;
  lastUpdated: string;
  status: string;
};

const defaultItems: ActivityItem[] = [
  {
    id: 1,
    title: "User Onboarding flow",
    type: "Workflow",
    lastUpdated: "2 hours ago",
    status: "Completed",
  },
  {
    id: 2,
    title: "New Product announcement",
    type: "Post",
    lastUpdated: "Yesterday",
    status: "Draft",
  },
  {
    id: 3,
    title: "Q3 Performance",
    type: "Analytics",
    lastUpdated: "3 days ago",
    status: "Generated",
  },
  {
    id: 4,
    title: "Summer photo Contest",
    type: "Contest",
    lastUpdated: "1 week ago",
    status: "Active",
  },
  {
    id: 5,
    title: "Admin Panel customization",
    type: "Settings",
    lastUpdated: "2 week ago",
    status: "Saved",
  },
  {
    id: 6,
    title: "Beta Tester",
    type: "User Group",
    lastUpdated: "2 week ago",
    status: "pending",
  },
];

export function RecentActivityTable({ className }: { className?: string }) {
  const statusClass = (status: string) => {
    const positive = ["Completed", "Generated"];
    if (positive.includes(status)) return "bg-teal-600 text-white";
    return "bg-gray-200 text-gray-700";
  };

  return (
    <Table className={`${className ?? ""} rounded-lg bg-white`}>
      <TableHeader className="">
        <tr className="text-left font-semibold text-gray-500 border-b">
          <TableHead className="py-3 px-4">ITEM</TableHead>
          <TableHead className="py-3 px-4">TYPE</TableHead>
          <TableHead className="py-3 px-4">LAST UPDATED</TableHead>
          <TableHead className="py-3 px-4">STATUS</TableHead>
        </tr>
      </TableHeader>

      <TableBody className="divide-y">
        {defaultItems.map((row) => (
          <TableRow key={row.id ?? row.title}>
            <TableCell className="py-4 px-4">{row.title}</TableCell>
            <TableCell className="py-4 px-4 text-gray-600">
              {row.type}
            </TableCell>
            <TableCell className="py-4 px-4 text-gray-600">
              {row.lastUpdated}
            </TableCell>
            <TableCell className="py-4 px-4">
              <div className="flex justify-end">
                <span
                  className={cn(
                    "inline-flex items-center justify-center px-3 py-2 rounded w-28",
                    statusClass(row.status)
                  )}
                >
                  {row.status}
                </span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
