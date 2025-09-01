import { Link } from "react-router";
import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DeletePostDialog } from "@/components/Post/DeletePostDialog";

type Props = {
  post: { id?: string; title?: string } | null;
};

export function ActionMenu({ post }: Props) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="left">
          <DropdownMenuItem asChild>
            <Link to={`/posts/${post?.id}`}>View</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={`/posts/${post?.id}/edit`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsDeleteOpen(true)}
            className="text-red-500"
            data-variant="destructive"
          >
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeletePostDialog
        open={isDeleteOpen}
        onOpenChange={(v) => setIsDeleteOpen(v)}
        post={post}
        onConfirm={() => setIsDeleteOpen(false)}
      />
    </>
  );
}
