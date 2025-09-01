import { useEffect, useMemo, useState } from "react";
import { PostsFilters } from "@/components/Posts/PostsFilters";
import { PostCard } from "@/components/Posts/PostCard";
import { PostDetailDialog } from "@/components/Posts/PostDetailDialog";
import { Checkbox } from "@/components/ui/checkbox";
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

type RandomUser = {
  login?: { username?: string };
  name?: { first?: string; last?: string };
  picture?: { thumbnail?: string; medium?: string; large?: string };
};

async function fetchDemoPosts(count = 9): Promise<Post[]> {
  try {
    const ruRes = await fetch(`https://randomuser.me/api/?results=${count}`);
    const ruJson = await ruRes.json();
    const users: RandomUser[] = Array.isArray(ruJson.results)
      ? ruJson.results
      : [];

    const statuses: Post["status"][] = [
      "flagged",
      "approved",
      "removed",
      undefined,
    ];

    return users.map((u: RandomUser, i: number) => {
      const name =
        u?.login?.username ||
        `${u?.name?.first || ""} ${u?.name?.last || ""}`.trim() ||
        `user${i}`;
      const avatar =
        u?.picture?.thumbnail ||
        u?.picture?.medium ||
        u?.picture?.large ||
        undefined;

      const seed = 100 + i;
      const unsplashImage = `https://picsum.photos/seed/${seed}/800/600`;

      return {
        id: `rp_${i + 1}`,
        title: [
          "Delicious breakfast ideas",
          "Koala in the wild",
          "Northern lights photography",
          "Vibrant flower closeup",
          "Succulent arrangement",
          "Birthday tea party",
        ][i % 6],
        author: name,
        excerpt:
          "Lorem ipsum dolor sit amet consectetur. Cras amet placerat faucibus scelerisque ornare.",
        date: `${Math.max(1, (i % 5) + 1)} days ago`,
        status: statuses[i % statuses.length],
        image: unsplashImage,
        avatar,
      } as Post;
    });
  } catch (err) {
    console.error("fetchDemoPosts error:", err);
    return [];
  }
}

export function PostModerationPanel({
  flagged = false,
}: {
  flagged?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(flagged ? "flagged" : "all");
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;
    fetchDemoPosts(6).then((res) => {
      if (mounted) setPostsData(res ?? []);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const posts = useMemo<Post[]>(() => {
    const source = postsData;
    return source.filter((p: Post) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q)
      );
    });
  }, [query, statusFilter, postsData]);

  function toggleSelectAll(checked: boolean | "indeterminate") {
    if (checked) {
      setSelectedIds(posts.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  }

  function bulkApprove() {
    if (selectedIds.length === 0) return;
    setPostsData((prev) =>
      prev.map((p) =>
        selectedIds.includes(p.id) ? { ...p, status: "approved" } : p
      )
    );
    console.log("bulk approve", selectedIds);
    setSelectedIds([]);
  }

  function bulkReject() {
    if (selectedIds.length === 0) return;
    setPostsData((prev) =>
      prev.map((p) =>
        selectedIds.includes(p.id) ? { ...p, status: "removed" } : p
      )
    );
    console.log("bulk reject", selectedIds);
    setSelectedIds([]);
  }

  return (
    <div>
      <div className="flex flex-col gap-1 mb-5">
        <PostsFilters
          flagged={flagged}
          query={query}
          onQueryChange={(v: string) => setQuery(v)}
          statusFilter={statusFilter}
          onStatusChange={(v: string) => setStatusFilter(v)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((p: Post) => (
          <PostCard
            key={p.id}
            post={p}
            selected={selectedIds.includes(p.id)}
            onApprove={(id) => console.log("approve", id)}
            onReject={(id) => console.log("reject", id)}
            onMore={(id) => {
              const found =
                postsData.find((x) => x.id === id) ??
                posts.find((x) => x.id === id) ??
                null;
              setSelectedPost(found);
              setDialogOpen(true);
            }}
          />
        ))}
      </div>

      <div className="flex items-center gap-3 mt-4">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selectedIds.length > 0}
            onCheckedChange={(v) => toggleSelectAll(Boolean(v))}
            aria-label="Select All"
          />
          <span className="text-sm text-muted-foreground">Select All</span>
        </div>

        <div className="ml-auto flex gap-2">
          <Button className="rounded" variant="default" onClick={bulkApprove}>
            Bulk Approve
          </Button>
          <Button
            className="rounded"
            variant="destructive"
            onClick={bulkReject}
          >
            Bulk Reject
          </Button>
        </div>
      </div>

      <PostDetailDialog
        post={selectedPost}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onApprove={(id) => {
          console.log("approved from dialog", id);
          setDialogOpen(false);
        }}
        onReject={(id) => {
          console.log("rejected from dialog", id);
          setDialogOpen(false);
        }}
      />
    </div>
  );
}
