import { PageLayout } from "@/components/layouts/PageLayout";
import { DataTable } from "@/components/table/DataTable";
import { useMemo, useState, useEffect } from "react";
import { parse, isValid, startOfDay, endOfDay } from "date-fns";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DateRangeField } from "@/components/DateRangeField";
import { postColumns, type PostItem } from "./postsColumns";
import { FunnelIcon } from "lucide-react";

function makeMockRows(n = 7): PostItem[] {
  return Array.from({ length: n }).map((_, i) => ({
    id: String(i + 1),
    postId: `P00${i + 1}`,
    title: `Post title ${i + 1}`,
    author: `Sharath`,
    avatar: `/assets/icons/upload-cloud.png`,
    dateCreated: "03 Jan 2025",
    status: i === 1 ? "Flagged" : "Published",
    engagement: "1250 Likes, 345 Comments, 120 Shares",
    thumbnail: `https://picsum.photos/seed/post${i + 1}/120/80`,
  }));
}

export default function PostsManagement() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [appliedStatus, setAppliedStatus] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [appliedDateRange, setAppliedDateRange] = useState<
    DateRange | undefined
  >();
  const [data, setData] = useState<PostItem[]>([]);

  useEffect(() => {
    setData(makeMockRows(7));
  }, []);

  const rows = useMemo(() => {
    const q = appliedQuery.toLowerCase();
    return data.filter((r) => {
      if (appliedStatus !== "all" && r.status.toLowerCase() !== appliedStatus)
        return false;
      if (!q) return true;
      return (
        r.postId.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q)
      );
    });
  }, [data, appliedQuery, appliedStatus]);

  const filteredRows = useMemo(() => {
    if (!appliedDateRange || (!appliedDateRange.from && !appliedDateRange.to))
      return rows;

    const from = appliedDateRange.from
      ? startOfDay(appliedDateRange.from)
      : null;
    const to = appliedDateRange.to ? endOfDay(appliedDateRange.to) : null;

    return rows.filter((r) => {
      if (!r.dateCreated) return false;
      const parsed = parse(r.dateCreated, "dd MMM yyyy", new Date());
      if (!isValid(parsed)) return false;
      if (from && parsed < from) return false;
      if (to && parsed > to) return false;
      return true;
    });
  }, [rows, appliedDateRange]);

  return (
    <PageLayout title="Posts Management">
      <div className="bg-white rounded-lg p-4 border mb-4">
        <div className="grid grid-cols-5 gap-4 items-end">
          <div className="col-span-1">
            <label className="text-sm text-slate-600">Date Range</label>
            <DateRangeField
              value={dateRange}
              onChange={(range) => setDateRange(range)}
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Status</label>
            <Select value={status} onValueChange={(v) => setStatus(v)}>
              <SelectTrigger size="sm" className="w-full">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-slate-600">Category</label>
            <Select>
              <SelectTrigger size="sm" className="w-full">
                <SelectValue placeholder="All Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Category</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-slate-600">Search by Keyword</label>
            <Input
              className="mt-1"
              placeholder="Search by keyword.."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="search-keyword"
            />
          </div>
          <div className="flex items-end justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setAppliedQuery(query);
                setAppliedStatus(status);
                setAppliedDateRange(dateRange);
              }}
              className="flex items-center gap-2 rounded-full border-teal-300 text-teal-600"
            >
              <FunnelIcon className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border">
        <DataTable columns={postColumns} data={filteredRows} pageSize={5} />
      </div>
    </PageLayout>
  );
}
