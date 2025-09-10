import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { UploadCloud } from "lucide-react";

type Props = {
  onAttach?: (files: File[]) => void;
  trigger?: React.ReactNode;
};

export const AttachDialog: React.FC<Props> = ({ onAttach, trigger }) => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleFiles(newFiles: FileList | null) {
    if (!newFiles) return;
    const arr = Array.from(newFiles);
    setFiles((prev) => [...prev, ...arr]);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  }

  function handleSave() {
    onAttach?.(files);
    setFiles([]);
    setOpen(false);
  }

  function handleCancel() {
    setFiles([]);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
      <DialogTrigger asChild>
        {trigger ?? <Button>Attach</Button>}
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Attachments</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="w-full border border-gray-200 rounded p-3 text-center bg-white"
          >
            <div className="flex flex-col items-center justify-center gap-3">
              <UploadCloud className="w-8 h-8 text-gray-500" />
              <div className="text-sm text-gray-500">
                Drag & drop an image or click to upload
              </div>

              <input
                ref={inputRef}
                type="file"
                className="hidden"
                multiple
                onChange={(e) => handleFiles(e.target.files)}
              />

              <Button
                variant="outline"
                className="mt-2 rounded"
                onClick={() => inputRef.current?.click()}
              >
                Browse Files
              </Button>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-4 bg-gray-50 border border-gray-100 rounded p-3">
              <div className="font-medium mb-2">Selected files</div>
              <ul className="text-sm text-gray-700 space-y-1 max-h-40 overflow-auto">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <div className="truncate pr-2">{f.name}</div>
                    <div className="text-xs text-gray-400">
                      {Math.round(f.size / 1024)} KB
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex justify-center gap-3">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="w-32 rounded text-primary border-primary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="w-32 rounded"
              onClick={handleSave}
              disabled={files.length === 0}
            >
              Save Attachments
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
