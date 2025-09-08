import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import type { SupportRow } from "./supportColumns";

export type Filters = {
  query: string;
  typeFilter: string;
  priorityFilter: string;
  statusFilter: string;
  dateFilter: string;
};

export function SupportFilters({
  filters,
  setFilters,
  data,
}: {
  filters: Filters;
  setFilters: (f: Partial<Filters>) => void;
  data: SupportRow[];
}) {
  const types = useMemo(
    () => Array.from(new Set(data.map((d) => d.type))),
    [data]
  );

  const statusDisplayMap: Record<string, string> = {
    All: "Status",
    Active: "New",
    InProgress: "In Progress",
    Resolved: "Resolved",
    Archived: "Archived",
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <div className="flex gap-2 items-center w-full md:w-auto">
        <Select
          value={filters.typeFilter}
          onValueChange={(val) => setFilters({ typeFilter: val })}
        >
          <SelectTrigger className="w-36">
            <SelectValue>{filters.typeFilter}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="All Types">All Types</SelectItem>
              {types.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={filters.priorityFilter}
          onValueChange={(val) => setFilters({ priorityFilter: val })}
        >
          <SelectTrigger className="w-32">
            <SelectValue>
              {filters.priorityFilter === "All"
                ? "Priority"
                : filters.priorityFilter}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={filters.statusFilter}
          onValueChange={(val) => setFilters({ statusFilter: val })}
        >
          <SelectTrigger className="w-36">
            <SelectValue>
              {statusDisplayMap[filters.statusFilter] ?? filters.statusFilter}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Active">New</SelectItem>
              <SelectItem value="InProgress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
              <SelectItem value="Archived">Archived</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          type="date"
          className="w-auto"
          value={filters.dateFilter}
          onChange={(e) => setFilters({ dateFilter: e.target.value })}
        />
      </div>

      <div className="flex gap-2">
        <div className="flex items-center relative">
          <Search className="absolute left-3 w-4 h-4 text-gray-400 ml-1" />
          <Input
            className="pl-10 focus:outline-none"
            placeholder="Search User ID"
            value={filters.query}
            onChange={(e) => setFilters({ query: e.target.value })}
          />
        </div>
        <Button variant="outline" className="border-primary text-primary">
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Filter</span>
        </Button>
      </div>
    </div>
  );
}
