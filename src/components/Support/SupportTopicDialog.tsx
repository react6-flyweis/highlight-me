import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
type Topic = {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  time: string;
  notes: string;
  ip: string;
  avatar?: string;
};

type Props = {
  topic?: Topic | null;
  open: boolean;
  onClose: () => void;
};

export function SupportTopicDialog({ topic, open, onClose }: Props) {
  if (!topic) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Feedback detail</DialogTitle>
        </DialogHeader>

        <div className="mt-4 grid grid-cols-1 gap-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={
                  topic.avatar ?? `https://i.pravatar.cc/150?img=${topic.id}`
                }
                alt={topic.author}
              />
              <AvatarFallback>
                {topic.author.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{topic.author}</div>
              <div className="text-xs text-muted-foreground">#123456556</div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Type : Feature request submitted on {topic.date}
          </div>

          <h4 className="font-medium">Password</h4>
          <div className="text-sm text-muted-foreground">{topic.notes}</div>

          <h4 className="font-medium">Internal Notes</h4>
          <Textarea defaultValue={topic.notes} className="rounded" />

          <div className="flex gap-4 mt-3 justify-center">
            <Button
              size="lg"
              className="rounded border-primary text-primary"
              variant="outline"
            >
              Reply
            </Button>
            <Button size="lg" className="rounded">
              Change Status
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded border-primary text-primary"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
