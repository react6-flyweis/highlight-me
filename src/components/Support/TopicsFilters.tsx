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
// topicTypes not required in this file

type Props = {
  query: string;
  setQuery: (v: string) => void;
  categoryFilter: string;
  setCategoryFilter: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  categories: string[];
};

export function TopicsFilters({
  query,
  setQuery,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  categories,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <div className="flex gap-2 items-center w-full md:w-auto">
        <div className="flex gap-2">
          {/* status options: value (used in state) and label (shown to user) */}
          {[
            { value: "All", label: "All" },
            { value: "Published", label: "Published" },
            { value: "Draft", label: "Drafts" },
            { value: "Archived", label: "Archived" },
          ].map((s) => {
            const active = statusFilter === s.value;
            return (
              <Button
                key={s.value}
                type="button"
                variant={active ? "default" : "outline"}
                onClick={() => setStatusFilter(s.value)}
              >
                {s.label}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex items-center relative">
          <Search className="absolute left-3 w-4 h-4 text-gray-400 ml-1" />
          <Input
            className="pl-10 focus:outline-none"
            placeholder="Search by keyword/title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Select
          value={categoryFilter}
          onValueChange={(val) => setCategoryFilter(val)}
        >
          <SelectTrigger className="w-36 border-primary text-primary">
            <SelectValue>
              {categoryFilter === "All" ? "Categories" : categoryFilter}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="All">All</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant="outline" className="border-primary text-primary">
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Filter</span>
        </Button>
      </div>
    </div>
  );
}
