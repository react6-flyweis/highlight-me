import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type ConfirmMfaDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (password: string) => void;
};

export function ConfirmMfaDialog({
  open,
  onOpenChange,
  onConfirm,
}: ConfirmMfaDialogProps) {
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    onConfirm(password);
    setPassword("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded">
        <DialogHeader>
          <DialogTitle>Confirm Changes</DialogTitle>
          <DialogDescription>
            Please enter your password to confirm these changes to your MFA
            settings.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <label className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            className="w-full rounded border px-3 py-2"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border-primary rounded"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </DialogClose>

          <Button className="rounded" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
