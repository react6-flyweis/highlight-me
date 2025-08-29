import { Link } from "react-router";
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
  onQueryChange?: (v: string) => void;
  statusFilter?: string;
  onStatusChange?: (v: string) => void;
};

export function PostsBreadcrumb({
  query = "",
  onQueryChange = () => {},
  statusFilter = "all",
  onStatusChange = () => {},
}: Props) {
  const [contentType, setContentType] = useState<string>("any");
  return (
    <div className="flex flex-col w-full">
      <nav className="text-sm text-slate-500 mb-3">
        <Link to="/posts/reported" className="underline mr-2">
          All Posts
        </Link>
        <span className="mr-2">/</span>
        <Link to="#" className="mr-2 text-slate-600">
          Flagged Posts
        </Link>
        <span className="mr-2">/</span>
        <Link to="#" className="mr-2 text-slate-600">
          Approved Posts
        </Link>
        <span className="mr-2">/</span>
        <Link to="#" className="text-slate-600">
          Removed Posts
        </Link>
      </nav>

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
            <SelectItem value="any">Any</SelectItem>
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
          variant="outline"
          className="rounded-lg text-sm bg-white border shadow-sm"
        >
          Flagged Only
        </Button>

        <Select onValueChange={(v) => onStatusChange(v)} value={statusFilter}>
          <SelectTrigger size="sm" className="w-36">
            <SelectValue placeholder="Pending">Pending</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="reviewed">Reviewed</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={() => {}}>
          <SelectTrigger size="sm" className="w-32">
            <SelectValue>Date</SelectValue>
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

        <span className="ml-4 text-sm text-slate-500">Apply Filters</span>
      </div>
    </div>
  );
}
