export default function DetailsBadge({ text }: { text?: string }) {
  const t = (text || "").toLowerCase();
  const statusColorMap: Record<string, string> = {
    pending: "text-orange-600",
    rejected: "text-red-600",
    "no appeal": "text-gray-500",
  };

  const matchedKey = Object.keys(statusColorMap).find((k) => t.includes(k));
  const colorClass = matchedKey
    ? statusColorMap[matchedKey]
    : "text-muted-foreground";

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm ${colorClass}`}
    >
      {text}
    </span>
  );
}
