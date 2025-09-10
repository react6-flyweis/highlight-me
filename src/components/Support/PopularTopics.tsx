import { TopicCard } from "@/components/Support/TopicCard";
import {
  MessageCircle,
  HelpCircle,
  FileText,
  User,
  List,
  Activity,
  Layers,
  File,
  BarChart2,
} from "lucide-react";

const popularTopics = [
  {
    title: "Feedback & Support Dashboard",
    Icon: MessageCircle,
    bg: "bg-violet-400",
  },
  {
    title: "FAQ / Help Topics Management",
    Icon: HelpCircle,
    to: "/support/faqs-topics",
    bg: "bg-orange-400",
  },
  {
    title: "Feedback Detail View",
    Icon: FileText,
    to: "/support/feedback",
    bg: "bg-rose-400",
  },
  {
    title: "Support Requests List",
    Icon: User,
    to: "/support/requests",
    bg: "bg-amber-300",
  },
  {
    title: "User Feedback List",
    Icon: List,
    to: "/support/user-feedback",
    bg: "bg-blue-500",
  },
  {
    title: "Support Request Detail View",
    Icon: Activity,
    to: "/support/requests/detail",
    bg: "bg-emerald-500",
  },
  {
    title: "Common Modals / Pop-ups",
    Icon: Layers,
    to: "/support/topic/modals",
    bg: "bg-pink-300",
  },
  {
    title: "Internal Notes System",
    Icon: File,
    to: "/support/notes",
    bg: "bg-teal-300",
  },
  {
    title: "Analytics Tab",
    Icon: BarChart2,
    to: "/support/analytics",
    bg: "bg-lime-400",
  },
];

export function PopularTopics() {
  return (
    <div className="mt-8 p-5 bg-white">
      <h2 className="text-lg font-medium">Popular Topic</h2>
      <p className="text-sm text-gray-500 mb-6">
        Popular Topic based on categories
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {popularTopics.map((topic) => (
          <TopicCard key={topic.title} topic={topic} />
        ))}
      </div>
    </div>
  );
}
