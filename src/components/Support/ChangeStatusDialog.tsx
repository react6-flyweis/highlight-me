import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentStatus?: string;
  onConfirm?: (values: { from?: string; to: string; notes?: string }) => void;
};

const DEFAULT_STATUSES = ["Open", "Pending", "On Hold", "Resolved", "Closed"];

export function ChangeStatusDialog({
  open,
  onOpenChange,
  currentStatus,
  onConfirm,
}: Props) {
  const [from, setFrom] = useState<string | undefined>(currentStatus);
  const [to, setTo] = useState<string>(currentStatus ?? DEFAULT_STATUSES[0]);
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    setFrom(currentStatus);
    setTo(currentStatus ?? DEFAULT_STATUSES[0]);
    setNotes("");
  }, [currentStatus, open]);

  function handleUpdate() {
    onConfirm?.({ from, to, notes });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle className="text-lg">Change Status</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current
            </label>
            <Select value={from} onValueChange={(v) => setFrom(v || undefined)}>
              <SelectTrigger className="w-full rounded">
                <SelectValue placeholder={currentStatus ?? "Select"} />
              </SelectTrigger>
              <SelectContent>
                {DEFAULT_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New status
            </label>
            <Select value={to} onValueChange={(v) => setTo(v)}>
              <SelectTrigger className="w-full rounded">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {DEFAULT_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <Textarea
              placeholder="Add notes for this status change..."
              className="w-full h-32 rounded"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="rounded w-32 border-primary text-primary"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </DialogClose>

          <Button className="rounded w-32" onClick={handleUpdate}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
