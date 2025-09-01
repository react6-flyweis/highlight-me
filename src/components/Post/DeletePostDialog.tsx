import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";

type Post = { id?: string; title?: string } | null;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: Post;
  onConfirm: () => void;
};

export function DeletePostDialog({
  open,
  onOpenChange,
  post,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Post Deletion</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Please ensure you want to proceed.
          </DialogDescription>
        </DialogHeader>

        <div className="border rounded-lg p-4 my-4 bg-red-50">
          <div className="text-red-600 font-medium">
            Are you absolutely sure?
          </div>
          <div className="text-sm text-slate-500 mt-2">
            This will permanently delete "{post?.title ?? "this post"}". All
            associated data will be lost.
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="bg-destructive text-white"
              onClick={() => onConfirm()}
            >
              Confirm Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
