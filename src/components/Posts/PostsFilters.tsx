import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "../ui/button";

type Props = {
  query?: string;
  statusFilter?: string;
  flagged: boolean;
  onQueryChange?: (v: string) => void;
  onStatusChange?: (v: string) => void;
};

export function PostsFilters({
  query = "",
  flagged,
  onQueryChange = () => {},
  statusFilter = "all",
  onStatusChange = () => {},
}: Props) {
  const [contentType, setContentType] = useState<string>();
  return (
    <div className="flex flex-col w-full">
      {/* Search row */}
      <div className="mb-3">
        <Input
          placeholder="Search Posts..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-80"
        />
      </div>

      {/* Filter pills row */}
      <div className="flex items-center gap-3">
        <Select value={contentType} onValueChange={(v) => setContentType(v)}>
          <SelectTrigger size="sm" className="w-40">
            <SelectValue placeholder="Content type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          className="rounded-lg text-sm bg-white border shadow-sm"
        >
          Date Range
        </Button>
        <Button
          disabled={flagged}
          variant="outline"
          className="rounded-lg text-sm bg-white border shadow-sm"
        >
          Flagged Only
        </Button>

        <Select onValueChange={(v) => onStatusChange(v)} value={statusFilter}>
          <SelectTrigger size="sm" className="w-36">
            <SelectValue placeholder="Pending">Status</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="reviewed">Reviewed</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={() => {}}>
          <SelectTrigger size="sm" className="w-32">
            <SelectValue placeholder="Date">Date</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">Last 7 days</SelectItem>
          </SelectContent>
        </Select>

        <button className="ml-2 px-4 py-2 rounded-lg text-sm bg-teal-500 text-white">
          Apply Filters
        </button>

        <span className="ml-4 text-sm text-slate-500">Clear Filters</span>
      </div>
    </div>
  );
}
