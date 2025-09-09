import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

type Ticket = {
  id: string;
  title: string;
  author: string;
  date: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTicketId?: string;
  onConfirm?: (selectedIds: string[]) => void;
};

const SAMPLE_TICKETS: Ticket[] = [
  {
    id: "REQ-2024-00123",
    title: "Login flow broken",
    author: "John Doe",
    date: "2024-03-01",
  },
  {
    id: "REQ-2024-00087",
    title: "Cannot log in with Google",
    author: "Mike Brown",
    date: "2024-03-03",
  },
  {
    id: "REQ-2024-00111",
    title: "Session expires too quickly",
    author: "Jane Roe",
    date: "2024-02-20",
  },
];

export function MergeTicketsDialog({
  open,
  onOpenChange,
  currentTicketId,
  onConfirm,
}: Props) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // reset when opened/closed
    if (!open) {
      setSearch("");
      setSelected({});
    }
  }, [open]);

  const tickets = SAMPLE_TICKETS.filter((t) => t.id !== currentTicketId);

  const filtered = tickets.filter((t) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      t.title.toLowerCase().includes(q) ||
      t.author.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q)
    );
  });

  function toggle(id: string) {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  }

  function handleMerge() {
    const ids = Object.keys(selected).filter((k) => selected[k]);
    onConfirm?.(ids);
    onOpenChange(false);
  }

  const anySelected = Object.values(selected).some(Boolean);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle className="text-lg">Merge Feedback</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search team members
            </label>
            <input
              className="w-full rounded border px-3 py-2"
              placeholder="Search team members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="border rounded p-3 max-h-56 overflow-auto bg-white">
            {filtered.length === 0 && (
              <div className="text-sm text-muted-foreground">No results</div>
            )}

            <div className="space-y-3">
              {filtered.map((t) => (
                <label
                  key={t.id}
                  className="flex items-start gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={!!selected[t.id]}
                    onChange={() => toggle(t.id)}
                    className="mt-1 h-4 w-4"
                  />
                  <div>
                    <div className="font-medium">{t.title}</div>
                    <div className="text-sm text-muted-foreground">
                      by {t.author} on {t.date}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="rounded w-36 border-primary text-primary"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            className="rounded w-36"
            onClick={handleMerge}
            disabled={!anySelected}
          >
            Merge Selected
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
