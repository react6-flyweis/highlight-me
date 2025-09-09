import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

export type Filters = {
  query: string;
  statusFilter: string;
  sortBy: "newest" | "oldest";
};

type Props = {
  filters: Filters;
  onChange: (f: Filters) => void;
};

export function UserFeedbackFilters({ filters, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Search Feed"
          value={filters.query}
          onChange={(e) => onChange({ ...filters, query: e.target.value })}
        />
      </div>

      <Select
        value={filters.statusFilter}
        onValueChange={(v) => onChange({ ...filters, statusFilter: v })}
      >
        <SelectTrigger className="w-48">
          <SelectValue>
            {filters.statusFilter === "All"
              ? "Filter by status"
              : filters.statusFilter}
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

      <Select
        value={filters.sortBy}
        onValueChange={(v) =>
          onChange({ ...filters, sortBy: v as Filters["sortBy"] })
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue>
            {filters.sortBy === "newest" ? "Sort: Newest" : "Sort: Oldest"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
