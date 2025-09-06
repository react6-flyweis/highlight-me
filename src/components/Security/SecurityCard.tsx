import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import React from "react";

type IconType = React.ComponentType<{ size?: number; className?: string }>;

interface SecurityCardProps {
  title: string;
  desc: string;
  to: string;
  icon: IconType;
  meta?: string;
}

export function SecurityCard({
  title,
  desc,
  to,
  icon: Icon,
  meta,
}: SecurityCardProps) {
  return (
    <div className="bg-white rounded-md shadow-sm border flex flex-col overflow-hidden">
      <div className="p-6 flex flex-col items-start">
        <div className="mb-3">
          <Icon size={24} className="text-primary" />
        </div>

        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-slate-500 mb-3">{desc}</p>

        {meta && <p className="text-xs text-slate-400 mb-4">{meta}</p>}

        <div className="mt-auto w-full">
          <Link to={to}>
            <Button>Manage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
