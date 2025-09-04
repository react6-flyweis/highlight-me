import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import type { PostItem } from "@/pages/Moderation/ReportedContent";
import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  post: PostItem;
  selected?: boolean;
  showSelection?: boolean;
  onToggle?: (id: string) => void;
};

export const ReportedModerationCard: React.FC<Props> = ({
  post,
  selected,
  showSelection,
  onToggle,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // Use tags from post if available, otherwise fall back to example tags shown in the mock
  const rawTags = post as unknown as { tags?: unknown };
  const tags: string[] = Array.isArray(rawTags.tags)
    ? (rawTags.tags.filter((x) => typeof x === "string") as string[])
    : [
        "Misleading information",
        "Hate Speech",
        "Impersonation",
        "Violence",
        "Nudity",
        "Bully",
        "Privacy violation",
      ];
  return (
    <div
      ref={rootRef}
      className="bg-white shadow rounded overflow-hidden relative"
    >
      <div className="h-40 bg-gray-100">
        <img
          src={post.image}
          alt="post"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-gray-600">
              Posted by:{" "}
              <span className="font-medium text-gray-800">{post.author}</span>
            </div>
          </div>

          <div className="relative">
            <button
              aria-label="more"
              className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
              onClick={() => setMenuOpen((s) => !s)}
            >
              <MoreVertical size={18} />
            </button>

            {menuOpen && (
              <div
                role="menu"
                aria-label="actions"
                className="absolute right-0 top-full mt-2 w-48 bg-white border rounded shadow-md p-1 z-20"
              >
                <Link
                  to="/tools/moderation-actions"
                  state={{ post }}
                  onClick={() => setMenuOpen(false)}
                  className="block"
                >
                  <Button variant="ghost" className="w-full">
                    Take Action
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-xs bg-white border border-gray-200 rounded-full shadow-sm text-gray-700"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4">
          <button className="w-full border rounded py-2 hover:bg-gray-50">
            View Details
          </button>
        </div>

        {showSelection && (
          <div className="mt-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!selected}
                onChange={() => onToggle?.(post.id)}
              />
              Select
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
