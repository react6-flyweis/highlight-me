import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DateRangeField } from "../DateRangeField";

type Props = {
  selectionMode: boolean;
  allSelected: boolean;
  onSelectAllChange: (checked: boolean) => void;
  onDateChange?: (v: string) => void;
  onContentTypeChange?: (v: string) => void;
  onFlagReasonChange?: (v: string) => void;
  onApprove?: () => void;
  onRemove?: () => void;
};

export function ContentFilters({
  selectionMode,
  allSelected,
  onSelectAllChange,
  onDateChange,
  onContentTypeChange,
  onFlagReasonChange,
  onApprove,
  onRemove,
}: Props) {
  return (
    <div className="mt-4 flex items-center gap-3">
      <div className="flex gap-2 items-center">
        {selectionMode ? (
          <label className="inline-flex items-center gap-2">
            <Checkbox
              checked={allSelected}
              onCheckedChange={(v) => onSelectAllChange(Boolean(v))}
            />
            <span className="text-sm">Select All</span>
          </label>
        ) : null}

        <DateRangeField
          className="h-9 w-fit"
          onChange={(v) => onDateChange?.(v?.from?.toISOString() || "")}
          aria-label="Filter date"
        />

        <Select onValueChange={(v) => onContentTypeChange?.(v)}>
          <SelectTrigger className="px-3 py-2">
            <SelectValue placeholder="Content type">Content type</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="video">Video</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => onFlagReasonChange?.(v)}>
          <SelectTrigger className="px-3 py-2">
            <SelectValue placeholder="Flag Reason">Flag Reason</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="nudity">Nudity</SelectItem>
              <SelectItem value="spam">Spam</SelectItem>
              <SelectItem value="misleading">Misleading information</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="ml-auto flex gap-2">
        <Button variant="default" className="rounded" onClick={onApprove}>
          Approve selected
        </Button>
        <Button variant="destructive" className="rounded" onClick={onRemove}>
          Remove selected
        </Button>
      </div>
    </div>
  );
}
