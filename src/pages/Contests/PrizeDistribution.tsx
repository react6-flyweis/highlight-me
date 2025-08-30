import { useMemo, useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { ExportCSVButton } from "@/components/table/ExportCSVButton";
import { ContestsNav } from "@/components/Contests/ContestsNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import type { ColumnDef, CellContext } from "@tanstack/react-table";

type Distribution = {
  id: string;
  winner: string;
  prize: string;
  contestDate: string;
  trackingNumber: string;
  status: "Pending" | "Shipped" | "Delivered" | "Failed";
};

const sampleData: Distribution[] = [
  {
    id: "1",
    winner: "Emily Clark",
    prize: "Gaming PC Setup",
    contestDate: "2023-11-15",
    trackingNumber: "TRK987654321",
    status: "Delivered",
  },
  {
    id: "2",
    winner: "John Doe",
    prize: "Headphones",
    contestDate: "2023-11-16",
    trackingNumber: "TRK123456789",
    status: "Shipped",
  },
  {
    id: "3",
    winner: "Alice Smith",
    prize: "Gift Card",
    contestDate: "2023-11-17",
    trackingNumber: "TRK555555555",
    status: "Pending",
  },
  {
    id: "4",
    winner: "Bob Brown",
    prize: "Gaming PC Setup",
    contestDate: "2023-11-15",
    trackingNumber: "TRK987654322",
    status: "Failed",
  },
];

export default function PrizeDistributionPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );

  const data = useMemo(() => {
    return sampleData.filter((d) => {
      if (statusFilter && d.status !== statusFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        d.winner.toLowerCase().includes(q) ||
        d.prize.toLowerCase().includes(q) ||
        d.trackingNumber.toLowerCase().includes(q)
      );
    });
  }, [query, statusFilter]);

  const columns = useMemo(
    (): ColumnDef<Distribution>[] => [
      {
        header: "Winner",
        accessorKey: "winner",
      },
      {
        header: "Prize",
        accessorKey: "prize",
      },
      {
        header: "Contest Date",
        accessorKey: "contestDate",
      },
      {
        header: "Tracking Number",
        accessorKey: "trackingNumber",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (ctx: CellContext<Distribution, unknown>) => {
          const val = ctx.getValue() as Distribution["status"];
          const variantMap = {
            Pending: "secondary",
            Shipped: "outline",
            Delivered: "default",
            Failed: "destructive",
          } as const;
          return (
            <Badge variant={variantMap[val as keyof typeof variantMap]}>
              {String(val)}
            </Badge>
          );
        },
      },
      {
        header: "Actions",
        accessorKey: "id",
        cell: () => (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" aria-label="View">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <PageLayout title="Contests & Prize management">
      <ContestsNav />
      <h1 className="text-2xl font-semibold mb-4">
        Prize Distribution Tracking
      </h1>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-transparent p-1 rounded">
            {(
              ["All", "Pending", "Shipped", "Delivered", "Failed"] as const
            ).map((s) => {
              const isAll = s === "All";
              const value = isAll ? undefined : s;
              const active = statusFilter === value;
              return (
                <Button
                  key={s}
                  size="sm"
                  variant={active ? "default" : "outline"}
                  onClick={() => {
                    setStatusFilter(value);
                  }}
                  className="rounded-md"
                >
                  {s}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Input
            placeholder="Search by prizes and winners"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ExportCSVButton
            rows={data.map((d) => ({ original: d }))}
            filename="prize-distribution.csv"
            label="Export"
          />
        </div>
      </div>

      <DataTable columns={columns} data={data} pageSize={5} showPagination />
    </PageLayout>
  );
}
