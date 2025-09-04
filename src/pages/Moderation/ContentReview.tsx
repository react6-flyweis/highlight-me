import { ModerationNav } from "@/components/Moderation/moderationNav";
import { PageLayout } from "@/components/layouts/PageLayout";
import { ContentFilters } from "@/components/Moderation/ContentFilters";
import { ModerationCard } from "@/components/Moderation/ModerationCard";
import { useState } from "react";

export type PostItem = {
  id: string;
  image: string;
  avatar: string;
  author: string;
  when: string;
  flagDate: string;
  reason: string;
  views: number;
  likes: number;
  comments: number;
};

const demoPosts: PostItem[] = [
  {
    id: "1",
    image: "https://picsum.photos/seed/101/800/400",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    author: "Wanderlust_Explorer",
    when: "2 days ago",
    flagDate: "2025-07-20",
    reason: "Nudity",
    views: 1245,
    likes: 300,
    comments: 45,
  },
  {
    id: "2",
    image: "https://picsum.photos/seed/102/800/400",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    author: "Wanderlust_Explorer",
    when: "2 days ago",
    flagDate: "2025-07-20",
    reason: "Spam",
    views: 1245,
    likes: 300,
    comments: 45,
  },
  {
    id: "3",
    image: "https://picsum.photos/seed/103/800/400",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    author: "Wanderlust_Explorer",
    when: "2 days ago",
    flagDate: "2025-07-20",
    reason: "Misleading",
    views: 1245,
    likes: 300,
    comments: 45,
  },
  {
    id: "4",
    image: "https://picsum.photos/seed/104/800/400",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    author: "CitySnapper",
    when: "1 day ago",
    flagDate: "2025-08-01",
    reason: "Hate Speech",
    views: 890,
    likes: 120,
    comments: 12,
  },
  {
    id: "5",
    image: "https://picsum.photos/seed/105/800/400",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    author: "TrailTales",
    when: "5 hours ago",
    flagDate: "2025-08-28",
    reason: "Copyright",
    views: 452,
    likes: 76,
    comments: 8,
  },
  {
    id: "6",
    image: "https://picsum.photos/seed/106/800/400",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    author: "NatureNook",
    when: "3 days ago",
    flagDate: "2025-07-30",
    reason: "Violence",
    views: 2300,
    likes: 540,
    comments: 67,
  },
  {
    id: "7",
    image: "https://picsum.photos/seed/107/800/400",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    author: "FoodieFrames",
    when: "6 days ago",
    flagDate: "2025-07-18",
    reason: "Harassment",
    views: 670,
    likes: 98,
    comments: 21,
  },
  {
    id: "8",
    image: "https://picsum.photos/seed/108/800/400",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
    author: "StudioShots",
    when: "12 hours ago",
    flagDate: "2025-08-30",
    reason: "Spam",
    views: 310,
    likes: 44,
    comments: 4,
  },
  {
    id: "9",
    image: "https://picsum.photos/seed/109/800/400",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    author: "VintageVibes",
    when: "4 days ago",
    flagDate: "2025-07-25",
    reason: "Graphic",
    views: 1420,
    likes: 215,
    comments: 34,
  },
];

export default function ContentReview() {
  const [selected, setSelected] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);

  function toggleSelect(id: string) {
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );
  }

  function clearSelection() {
    setSelected([]);
    setSelectionMode(false);
  }

  const allSelected =
    selected.length === demoPosts.length && demoPosts.length > 0;

  function handleSelectAllChange(checked: boolean) {
    if (checked) setSelected(demoPosts.map((p) => p.id));
    else clearSelection();
    setSelectionMode(checked);
  }

  function bulkApprove() {
    // placeholder for bulk approve action
    console.log("bulk approve", selected);
    clearSelection();
  }

  function bulkRemove() {
    console.log("bulk remove", selected);
    clearSelection();
  }

  function enterSelectionModeAndSelect(id: string) {
    setSelectionMode(true);
    setSelected((s) => (s.includes(id) ? s : [...s, id]));
  }

  return (
    <PageLayout title="Content Review">
      <ModerationNav />

      {/* Top controls */}
      <ContentFilters
        selectionMode={selectionMode || selected.length > 0}
        allSelected={allSelected}
        onSelectAllChange={handleSelectAllChange}
        onDateChange={(v) => console.log("filter date", v)}
        onContentTypeChange={(v) => console.log("content type", v)}
        onFlagReasonChange={(v) => console.log("flag reason", v)}
        onApprove={bulkApprove}
        onRemove={bulkRemove}
      />

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {demoPosts.map((p) => (
          <ModerationCard
            key={p.id}
            post={p}
            selected={selected.includes(p.id)}
            onToggle={toggleSelect}
            showSelection={selectionMode || selected.includes(p.id)}
            onLongPressEnter={enterSelectionModeAndSelect}
          />
        ))}
      </div>
    </PageLayout>
  );
}
