import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Post = {
  id: string;
  title: string;
  author: string;
  excerpt: string;
  date: string;
  status?: "flagged" | "approved" | "removed";
  image?: string;
  avatar?: string;
};

type Props = {
  post?: Post | null;
  open: boolean;
  onClose: () => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
};

export function PostDetailDialog({
  post,
  open,
  onClose,
  onApprove,
  onReject,
}: Props) {
  if (!post) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-3xl h-[90vh] ">
        <DialogHeader className="col-span-1 md:col-span-2">
          <DialogTitle>Post Details: {post.id}</DialogTitle>
          {/* <DialogDescription className="mt-2">{post.title}</DialogDescription> */}
        </DialogHeader>

        <div className="w-full grid grid-cols-2 gap-6">
          <div className="col-span-1">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[420px] object-cover rounded"
            />
          </div>

          <div className="col-span-1">
            <div className="flex items-center gap-3">
              <img
                src={post.avatar}
                alt={post.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">{post.author}</div>
                <div className="text-xs text-muted-foreground">
                  Userid _ 1225 10.00a 12-12-2025
                </div>
              </div>
            </div>

            <h4 className="mt-2 font-medium">Caption</h4>
            <p className="text-sm text-muted-foreground mt-2">{post.excerpt}</p>

            <h4 className="mt-2 font-medium">Flagged Reasons</h4>
            <div className="flex gap-2 mt-2">
              <Badge className="text-sm bg-red-300 text-red-700">
                Nudity/Explicit Content
              </Badge>
              <Badge className="text-sm bg-gray-300 text-muted-foreground">
                Hate Speech
              </Badge>
            </div>

            <h4 className="mt-2 font-medium">Action History</h4>
            <div className="mt-1 p-2 border rounded text-sm text-muted-foreground">
              <p>
                <b>Flagged by system(nudity)</b> by automated on 2025 12 02
                ,10.00am(Within window time)
              </p>
              <p>
                <b>Reviewed</b> by automated on 2025 12 02 ,10.00am
              </p>
              <p>
                <b>Added note</b> by Beta on 2025 12 02 ,10.00am
              </p>
            </div>

            <h4 className="mt-2 font-medium">Admin notes</h4>
            <div className="mt-1 p-2 border rounded text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur. Cras amet placerat
              faucibus scelerisque ornare.
            </div>

            <div className="mt-2 flex flex-col gap-1">
              <Button className="rounded" onClick={() => onApprove?.(post.id)}>
                Approve Post
              </Button>
              <Button
                className="bg-red-400 hover:bg-red-600 rounded"
                onClick={() => onReject?.(post.id)}
              >
                Reject Post
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
