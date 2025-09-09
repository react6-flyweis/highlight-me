import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

type SupportControlsProps = {
  onAssignSelected?: () => void;
  onCloseSelected?: () => void;
  onDeleteSelected?: () => void;
  isAllSelected?: boolean;
  onSelectAllChange?: (v: boolean) => void;
};

export function SupportControls({
  onAssignSelected = () => {},
  onCloseSelected = () => {},
  onDeleteSelected = () => {},
  isAllSelected = false,
  onSelectAllChange = () => {},
}: SupportControlsProps) {
  const [selectAll, setSelectAll] = useState(isAllSelected);

  // keep local state in sync if parent controls it
  useState(() => {
    setSelectAll(isAllSelected);
  });

  const handleSelectAllChange = (v: unknown) => {
    const val = Boolean(v);
    setSelectAll(val);
    onSelectAllChange(val);
  };

  return (
    <div className="bg-white rounded-lg p-4 border mt-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selectAll}
            onCheckedChange={handleSelectAllChange}
            aria-label="Select All"
          />
          <span className="text-sm text-muted-foreground">Select All</span>
        </div>

        <div className="flex gap-2 ml-4">
          <Button
            className="rounded"
            variant="outline"
            onClick={onAssignSelected}
          >
            Assign Selected
          </Button>
          <Button
            className="rounded"
            variant="outline"
            onClick={onCloseSelected}
          >
            Close Selected
          </Button>
          <Button
            className="rounded"
            variant="destructive"
            onClick={onDeleteSelected}
          >
            Delete Selected
          </Button>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div className="flex gap-1 items-center">
          <label className="text-sm text-slate-600">Status:</label>
          <Select>
            <SelectTrigger className="rounded w-48">
              <SelectValue placeholder="All Statuses">All Statuses</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-1 items-center">
          <label className="text-sm text-slate-600">Priority:</label>
          <Select>
            <SelectTrigger className="rounded w-48">
              <SelectValue placeholder="All Priorities">
                All Priorities
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-1 items-center">
          <label className="text-sm text-slate-600">Assigned To:</label>
          <Select>
            <SelectTrigger className="rounded w-48">
              <SelectValue placeholder="All Agents">All Agents</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="agent1">Agent 1</SelectItem>
                <SelectItem value="agent2">Agent 2</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default SupportControls;
