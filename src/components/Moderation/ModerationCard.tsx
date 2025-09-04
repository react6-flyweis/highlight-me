import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Calendar,
  AlertTriangle,
  Eye,
  Heart,
  MessageCircle,
} from "lucide-react";
import type { PostItem } from "@/pages/Moderation/ContentReview";
import { useRef } from "react";

type Props = {
  post: PostItem;
  selected?: boolean;
  onToggle?: (id: string) => void;
  showSelection?: boolean;
  onLongPressEnter?: (id: string) => void;
};

export function ModerationCard({
  post,
  selected = false,
  onToggle,
  showSelection = false,
  onLongPressEnter,
}: Props) {
  const {
    id,
    image,
    avatar,
    author,
    when,
    flagDate,
    reason,
    views,
    likes,
    comments,
  } = post;

  const handleWarn = (postId: string) => {
    console.log("Warn:", postId);
  };

  const handleApprove = (postId: string) => {
    console.log("Approve:", postId);
  };

  const handleRemove = (postId: string) => {
    console.log("Remove:", postId);
  };
  // long press handling using ref so timer survives renders
  const pressTimer = useRef<number | null>(null);
  const handleClick = () => {
    if (showSelection && onToggle) onToggle(id);
  };
  const startPress = () => {
    if (pressTimer.current != null) return;
    pressTimer.current = window.setTimeout(() => {
      if (onLongPressEnter) onLongPressEnter(id);
      pressTimer.current = null;
    }, 500);
  };
  const cancelPress = () => {
    if (pressTimer.current != null) {
      window.clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  return (
    <div className="overflow-hidden">
      <div
        className={`relative rounded overflow-hidden ${
          showSelection ? "cursor-pointer" : ""
        }`}
        onMouseDown={startPress}
        onTouchStart={startPress}
        onMouseUp={cancelPress}
        onMouseLeave={cancelPress}
        onTouchEnd={cancelPress}
        onClick={handleClick}
      >
        <img src={image} alt="post" className="w-full h-44 object-cover" />
        <div className="absolute left-3 top-3">
          {/** only show checkbox if explicitly requested (selection mode or already selected) */}
          {(showSelection || selected) && (
            <Checkbox
              checked={selected}
              onCheckedChange={() => onToggle && onToggle(id)}
            />
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="font-medium text-base">{author}</div>
            <div className="text-xs text-muted-foreground">{when}</div>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="size-3" />
            <span>Flagged : {flagDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-3" />
            <div className="px-2 py-0.5 bg-white border rounded-full">
              {reason}
            </div>
          </div>
        </div>

        <div className="mt-2 border-y  py-2 justify-between flex items-center text-sm text-muted-foreground gap-6">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>{views}</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span>{comments}</span>
          </div>
        </div>

        <div className="mt-3 flex gap-3 justify-between">
          <Button
            variant="outline"
            className="flex-1 rounded"
            onClick={() => handleWarn(id)}
          >
            Warn
          </Button>
          <Button
            variant="default"
            className="flex-1 rounded"
            onClick={() => handleApprove(id)}
          >
            Approve
          </Button>
          <Button
            variant="destructive"
            className="flex-1 rounded"
            onClick={() => handleRemove(id)}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
