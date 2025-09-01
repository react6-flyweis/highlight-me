import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalWinners: number;
  errorsFound: number;
  onViewReport?: () => void;
};

export function UploadSuccessDialog({
  open,
  onOpenChange,
  totalWinners,
  errorsFound,
  onViewReport,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">
            Winners Uploaded Successfully
          </DialogTitle>
          <DialogDescription className="text-center">
            Your winner data has been processed. Here's a summary of the upload.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 text-center text-sm text-muted-foreground">
          <div className="mb-6">Total Winners Uploaded: {totalWinners}</div>
          <div>Errors Found: {errorsFound}</div>
        </div>

        <DialogFooter className="sm:justify-center gap-4">
          <Button
            className="rounded h-11 border-primary min-w-32"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button
            className="rounded h-11  min-w-32"
            onClick={() => onViewReport && onViewReport()}
          >
            View Distribution Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
