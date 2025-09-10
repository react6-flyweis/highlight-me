import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  trigger?: React.ReactNode;
  name?: string;
  onConfirm?: () => void;
};

export const DeleteCategoryDialog: React.FC<Props> = ({
  trigger,
  name,
  onConfirm,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? <Button variant="destructive">Delete</Button>}
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle className="text-lg">Delete Category</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <Textarea
            readOnly
            value={name ?? ""}
            className="h-40 rounded"
            placeholder="e.g., General Support, Technical Issues, Billing"
          />
        </div>

        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button variant="outline" className="w-32 rounded">
              Cancel
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              className="w-32 rounded"
              onClick={() => {
                onConfirm?.();
              }}
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
