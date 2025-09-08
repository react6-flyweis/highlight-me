import { Link } from "react-router";

export interface PopularTopic {
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
  to?: string;
  bg: string; // Tailwind CSS background color class
}

export function TopicCard({ topic }: { topic: PopularTopic }) {
  const { title, Icon, to, bg } = topic;

  const baseClasses =
    "border rounded p-6 flex flex-col items-center text-center hover:shadow-sm transition-shadow duration-150 bg-white";

  const content = (
    <>
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${bg}`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-sm font-semibold">{title}</div>
    </>
  );

  // Render a Link when `to` is provided, otherwise render a non-link container.
  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <div className={baseClasses} role="group" aria-label={title}>
      {content}
    </div>
  );
}
