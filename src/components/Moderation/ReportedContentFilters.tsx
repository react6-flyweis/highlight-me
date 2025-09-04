import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  selectionMode?: boolean;
  allSelected?: boolean;
  onSelectAllChange?: (checked: boolean) => void;
  onDateChange?: (v: string) => void;
  onContentTypeChange?: (v: string) => void;
  onFlagReasonChange?: (v: string) => void;
  onApprove?: () => void;
  onRemove?: () => void;
};

export const ReportedContentFilters: React.FC<Props> = ({
  selectionMode,
  allSelected,
  onSelectAllChange,
  onContentTypeChange,
  onFlagReasonChange,
  onApprove,
  onRemove,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex gap-3 items-center">
        <Select onValueChange={(v) => onFlagReasonChange?.(v)}>
          <SelectTrigger className="px-3 py-2">
            <SelectValue placeholder="All Reasons">All Reasons</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="misleading">Misleading information</SelectItem>
              <SelectItem value="hate">Hate Speech</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => onSelectAllChange?.(v === "all")}>
          <SelectTrigger className="px-3 py-2">
            <SelectValue placeholder="1+ Reports">1+ Reports</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All reports</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => onContentTypeChange?.(v)}>
          <SelectTrigger className="px-3 py-2">
            <SelectValue placeholder="All Types">All Types</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="video">Video</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3">
        {selectionMode ? (
          <>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={!!allSelected}
                onCheckedChange={(v) => onSelectAllChange?.(Boolean(v))}
              />
              <span className="text-sm">Select all</span>
            </label>
            <Button className="rounded" onClick={onApprove}>
              Approve
            </Button>
            <Button
              variant="destructive"
              className="rounded"
              onClick={onRemove}
            >
              Remove
            </Button>
          </>
        ) : (
          <Button className="rounded">Bulk Actions</Button>
        )}
      </div>
    </div>
  );
};
