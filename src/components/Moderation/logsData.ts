import type { LogItem } from "./logsColumns";

export const logsData: LogItem[] = [
  {
    action: "Content Removed",
    moderator: "Alice",
    reason: "Hate Speech",
    timestamp: "2024-07-20 10:30 AM",
    affectedEntity: "Post by @johndoe about political",
    details: "Pending Appeal",
  },
  {
    action: "User Warned",
    moderator: "Alice",
    reason: "Spamming",
    timestamp: "2024-07-20 10:30 AM",
    affectedEntity: "Post by @johndoe about political",
    details: "No Appeal",
  },
  {
    action: "Content Reviewed - Approved",
    moderator: "Alice",
    reason: "Repeated Harassment",
    timestamp: "2024-07-20 10:30 AM",
    affectedEntity: "Post by @johndoe about political",
    details: "Appeal Rejected",
  },
  // add a few more rows to show pagination
  ...Array.from({ length: 15 }).map((_, i) => ({
    action: i % 2 === 0 ? "Content Removed" : "Keyword Added",
    moderator: "Alice",
    reason: i % 3 === 0 ? "Hate Speech" : "False Flag",
    timestamp: "2024-07-20 10:30 AM",
    affectedEntity: "Post by @johndoe about political",
    details: i % 4 === 0 ? "Pending Appeal" : "No Appeal",
  })),
];
