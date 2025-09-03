import { useNavigate } from "react-router";
import { EyeIcon, EditIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";

export function HashtagActions({ id }: { id: string }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      <Button
        size="icon"
        variant="ghost"
        aria-label={`view-${id}`}
        onClick={() => navigate(`/hashtags/management/${id}`)}
      >
        <EyeIcon className="size-5" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        aria-label={`edit-${id}`}
        onClick={() => navigate(`/hashtags/management/edit/${id}`)}
      >
        <EditIcon className="size-5" />
      </Button>
      <Button size="icon" variant="ghost" aria-label={`delete-${id}`}>
        <TrashIcon className="size-5" />
      </Button>
    </div>
  );
}
