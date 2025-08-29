import { PageLayout } from "@/components/layouts/PageLayout";
import { PostsBreadcrumb } from "@/components/UserManagement/PostsBreadcrumb";
import { PostCard } from "@/components/UserManagement/PostCard";
import { PostDetailDialog } from "@/components/UserManagement/PostDetailDialog";
import { useMemo, useState, useEffect } from "react";

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

      // Use a stable placeholder image service (picsum.photos) with seeded id
      // so demo images are deterministic and reliably load in previews.
      const seed = 100 + i; // small stable seed per item
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
    // fallback to local mock posts on error
    // log the error so developers can debug network issues
    console.error("fetchDemoPosts error:", err);
    return [];
  }
}

export default function Posts() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  return (
    <PageLayout title="Reported Posts">
      <div className="flex items-center justify-between gap-4 mb-6">
        <PostsBreadcrumb
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
    </PageLayout>
  );
}
