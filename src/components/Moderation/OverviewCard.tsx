import React from "react";

export const OverviewCard: React.FC<{
  title: string;
  subtitle?: string;
  value: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}> = ({ title, subtitle, value, Icon }) => {
  return (
    <div className="relative p-6 rounded-lg shadow-sm overflow-hidden flex flex-col justify-between bg-card hover:bg-blue-50 transition">
      {Icon && (
        <div className="absolute top-4 right-4 rounded-full p-2">
          <Icon className="w-5 h-5 text-muted-foreground" />
        </div>
      )}

      <div className="">
        <h2 className="text-foreground">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <p className="text-3xl font-bold mt-4 text-primary">{value}</p>
    </div>
  );
};
