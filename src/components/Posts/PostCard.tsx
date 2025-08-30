import { Button } from "@/components/ui/button";
import { Eye, Flag, HeartIcon, Pencil, CheckCircle, XIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
  post: Post;
  selected?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onMore?: (id: string) => void;
};

export function PostCard({
  post,
  selected,
  onApprove,
  onReject,
  onMore,
}: Props) {
  return (
    <div
      className={cn(
        "overflow-hidden",
        selected && "ring-2 ring-primary/40 rounded-xl"
      )}
    >
      <div
        className={cn("flex flex-col", selected ? "bg-primary/5" : undefined)}
      >
        {/* make the main card clickable to open details */}
        <div className="relative">
          {/* Use an <img> so the main image is visible and uses object-cover for proper cropping */}
          <img
            src={post.image ?? undefined}
            alt={post.title || "post image"}
            className="w-full h-40 object-cover bg-gray-100"
            onError={(e) => {
              // show a subtle placeholder background if image fails to load
              const target = e.currentTarget as HTMLImageElement;
              target.src =
                "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='20'>No image</text></svg>";
            }}
          />
          {/* Status badge overlay in top-right of image: single mapped badge */}
          {post.status &&
            (() => {
              const map: Record<
                NonNullable<typeof post.status>,
                { label: string; bg: string; text: string; Icon?: LucideIcon }
              > = {
                flagged: {
                  label: "Flagged",
                  bg: "bg-yellow-100",
                  text: "text-yellow-800",
                  Icon: Flag,
                },
                approved: {
                  label: "Approved",
                  bg: "bg-green-100",
                  text: "text-green-800",
                  Icon: CheckCircle,
                },
                removed: {
                  label: "Removed",
                  bg: "bg-red-100",
                  text: "text-red-800",
                  Icon: XIcon,
                },
              };

              const s = map[post.status as keyof typeof map];

              return (
                <span
                  className={`absolute top-3 right-3 flex items-center gap-1 text-xs px-2 py-1 rounded shadow ${s.bg} ${s.text}`}
                  role="status"
                  aria-label={`Post status: ${s.label}`}
                  title={s.label}
                >
                  <span>{s.label}</span>
                  {s.Icon && <s.Icon className="w-3 h-3" />}
                </span>
              );
            })()}
        </div>

        <div className="p-4" onClick={() => onMore?.(post.id)}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <img
                src={post.avatar}
                alt="author"
                className="w-10 h-10 rounded-full object-cover bg-transparent"
              />
              <div>
                <div className="text-sm font-semibold">{post.title}</div>
                <div className="text-xs text-muted-foreground">
                  {post.author} · {post.date}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <HeartIcon className="size-5" />
                <span className="text-sm">1,245</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-3">{post.excerpt}</p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-1">
              <Button
                className="bg-teal-500 text-white hover:bg-teal-600 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  onApprove?.(post.id);
                }}
              >
                Approve
              </Button>
              <Button
                className="bg-red-500 text-white hover:bg-red-600 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  onReject?.(post.id);
                }}
              >
                Reject
              </Button>

              <button
                aria-label="edit"
                className="w-10 h-10 rounded border border-muted-foreground/10 bg-white flex items-center justify-center shadow-sm hover:bg-muted-foreground/5"
                onClick={(e) => {
                  e.stopPropagation();
                  onMore?.(post.id);
                }}
              >
                <Pencil className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                aria-label="flag"
                className="w-10 h-10 rounded border border-muted-foreground/10 bg-white flex items-center justify-center shadow-sm hover:bg-muted-foreground/5"
                onClick={(e) => {
                  e.stopPropagation();
                  onReject?.(post.id);
                }}
              >
                <Flag className="w-4 h-4 text-yellow-600" />
              </button>
              <button
                aria-label="view"
                className="w-10 h-10 rounded border border-muted-foreground/10 bg-white flex items-center justify-center shadow-sm hover:bg-muted-foreground/5"
                onClick={(e) => {
                  e.stopPropagation();
                  onMore?.(post.id);
                }}
              >
                <Eye className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
