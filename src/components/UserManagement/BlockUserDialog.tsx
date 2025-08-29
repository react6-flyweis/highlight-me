import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
  onConfirm: () => void;
};

export function BlockUserDialog({
  open,
  onOpenChange,
  userName,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Block User</DialogTitle>
          <DialogDescription>
            This will prevent {userName ? `${userName} from` : "the user from"}{" "}
            accessing their account. You can unblock them later from the User
            Management panel
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="px-10 border-primary"
          >
            Cancel
          </Button>
          <Button variant="default" onClick={onConfirm} className="px-10">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BlockUserDialog;
