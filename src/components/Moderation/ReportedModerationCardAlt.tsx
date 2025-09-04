import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import type { PostItem } from "@/pages/Moderation/ReportedContent";
import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  post: PostItem;
};

export const ReportedModerationCardAlt: React.FC<Props> = ({ post }) => {
  const rawTags = post as unknown as { tags?: unknown };
  const tags: string[] = Array.isArray(rawTags.tags)
    ? (rawTags.tags.filter((x) => typeof x === "string") as string[])
    : ["Misleading information", "Privacy violation"];

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

  return (
    <div ref={rootRef} className="bg-white shadow rounded overflow-hidden">
      <div className="h-44 bg-gray-100">
        <img
          src={post.image}
          alt="post"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="">
              <span className="font-medium text-gray-800">Posted by: </span>{" "}
              <span className="text-gray-600">{post.author}</span>
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

        <div className="mt-3 text-sm text-gray-700 leading-relaxed">
          {post.description ?? post.caption}
        </div>

        <div className="mt-4">
          <div className="flex justify-center">
            <Button variant="outline" size="lg" className="w-2/3 rounded">
              View Details
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <div className=" font-medium mb-2">Report reason</div>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs border border-gray-200 rounded-full text-gray-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 font-medium text-gray-800">
          No .of Reports : <span className="">{post.reportsCount ?? 0}</span>
        </div>
      </div>
    </div>
  );
};

export default ReportedModerationCardAlt;
