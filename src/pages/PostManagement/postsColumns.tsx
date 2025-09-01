import { ActionMenu } from "@/components/Post/ActionMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ColumnDef, CellContext } from "@tanstack/react-table";
// removed unused imports after extracting ActionMenu component

export type PostItem = {
  id: string;
  postId: string;
  title: string;
  author: string;
  avatar?: string;
  dateCreated: string;
  status: string;
  engagement: string;
  thumbnail?: string;
};

export const postColumns: ColumnDef<PostItem>[] = [
  {
    header: "Thumbnail",
    accessorKey: "thumbnail",
    cell: (row: CellContext<PostItem, unknown>) => (
      <img
        src={(row.getValue() as string) || ""}
        alt="thumb"
        className="w-24 h-12 object-cover rounded"
      />
    ),
  },
  { header: "Post ID", accessorKey: "postId" },
  {
    header: "Author",
    accessorKey: "author",
    cell: (info: CellContext<PostItem, unknown>) => (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={info.row.original.avatar} />
          <AvatarFallback>{info.row.original.author.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium">{info.getValue() as string}</div>
          <div className="text-xs text-slate-500">@sarac_l</div>
        </div>
      </div>
    ),
  },
  { header: "Date Created", accessorKey: "dateCreated" },
  {
    header: "Status",
    accessorKey: "status",
    cell: (info: CellContext<PostItem, unknown>) => (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-lg text-xs ${
          (info.getValue() as string).toLowerCase() === "flagged"
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-600"
        }`}
      >
        {info.getValue() as string}
      </span>
    ),
  },
  { header: "Engagement", accessorKey: "engagement" },
  {
    header: "Actions",
    accessorKey: "id",
    cell: (info: CellContext<PostItem, unknown>) => {
      return <ActionMenu post={info.row.original} />;
    },
  },
];
