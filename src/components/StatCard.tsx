import React from "react";
import { Link } from "react-router";

export const StatCard: React.FC<{
  title: string;
  value: string;
  sub?: string;
  iconSrc?: string;
  iconAlt?: string;
  to?: string;
}> = ({ title, value, sub, iconSrc, iconAlt, to }) => {
  const content = (
    <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
      {iconSrc && (
        <img
          src={iconSrc}
          alt={iconAlt || title}
          className="absolute top-3 right-3 w-6 h-6"
        />
      )}
      <div>
        <p className="text-sm text-muted-foreground m-0">{title}</p>
        <h3 className="text-2xl font-semibold mt-1 mb-0">{value}</h3>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link
        to={to}
        className="block hover:shadow-md hover:scale-[1.01] transition-transform cursor-pointer"
        aria-label={`Open ${title}`}
      >
        {content}
      </Link>
    );
  }

  return content;
};
