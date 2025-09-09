import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

type TeamMember = {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  current?: TeamMember | string | undefined;
  onConfirm?: (member?: TeamMember) => void;
};

const TEAM: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Blake",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    role: "Support Agent",
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Senior Support",
  },
  {
    id: "3",
    name: "Priya Patel",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    role: "Billing",
  },
  {
    id: "4",
    name: "Agent Smith",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    role: "Support Agent",
  },
];

export function AssignTeamMemberDialog({
  open,
  onOpenChange,
  current,
  onConfirm,
}: Props) {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  useEffect(() => {
    // initialize selection from current value (string or object)
    if (typeof current === "string") {
      const found = TEAM.find((t) => t.name === current);
      setSelectedId(found?.id);
    } else if (current && typeof current === "object") {
      setSelectedId((current as TeamMember).id);
    } else {
      setSelectedId(undefined);
    }
    setSearch("");
  }, [current, open]);

  const filtered = TEAM.filter((m) =>
    m.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  function handleAssign() {
    const member = TEAM.find((t) => t.id === selectedId);
    onConfirm?.(member);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle className="text-lg">Assign Team Member</DialogTitle>
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
              {filtered.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedId(m.id)}
                  className={`w-full flex items-center gap-3 text-left p-2 rounded transition-colors hover:bg-gray-50 ${
                    selectedId === m.id ? "ring-2 ring-teal-400 bg-teal-50" : ""
                  }`}
                >
                  <Avatar>
                    {m.avatar ? (
                      <AvatarImage src={m.avatar} alt={m.name} />
                    ) : (
                      <AvatarFallback>
                        {m.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <div className="font-medium">{m.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {m.role}
                    </div>
                  </div>
                </button>
              ))}
            </div>
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

          <Button
            className="rounded w-32"
            onClick={handleAssign}
            disabled={!selectedId}
          >
            Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
