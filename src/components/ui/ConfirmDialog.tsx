import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
};

export function ConfirmDialog({
  open,
  onOpenChange,
  title = "Confirm",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
}: Props) {
  function handleConfirm() {
    onConfirm?.();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg w-full">
        <DialogHeader>
          <DialogTitle className="text-lg">{title}</DialogTitle>
        </DialogHeader>

        {description && <div className="py-2 text-sm">{description}</div>}

        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="rounded w-32 border-primary text-primary"
            >
              {cancelLabel}
            </Button>
          </DialogClose>

          <Button className="rounded w-32" onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
