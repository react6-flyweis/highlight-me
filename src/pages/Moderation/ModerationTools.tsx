import { ModerationNav } from "@/components/Moderation/moderationNav";
import { PageLayout } from "@/components/layouts/PageLayout";
import {
  Flag,
  ClipboardList,
  Settings,
  Clock,
  EyeOff,
  AreaChart,
} from "lucide-react";
import { OverviewCard } from "@/components/Moderation/OverviewCard";

export default function ModerationTools() {
  return (
    <PageLayout title="Moderation Tools">
      <ModerationNav />

      <header className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Current Status Overview
        </h3>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            key: "flagged",
            title: "Flagged content queue",
            subtitle: "Items awaiting review, 5 new in last hour",
            value: "1.2M",
            Icon: Flag,
          },
          {
            key: "reported",
            title: "Reported Posts",
            subtitle: "New reports since last week",
            value: "1.2M",
            Icon: EyeOff,
          },
          {
            key: "banned",
            title: "Banned Keyword List",
            subtitle: "Active keywords for auto-moderation",
            value: "1.2M",
            Icon: ClipboardList,
          },
          {
            key: "total",
            title: "Total Actions",
            subtitle: "Moderation actions this month",
            value: "1.2M",
            Icon: AreaChart,
          },
        ].map((card) => {
          return (
            <OverviewCard
              key={card.key}
              title={card.title}
              subtitle={card.subtitle}
              value={card.value}
              Icon={card.Icon}
            />
          );
        })}
      </section>

      <section>
        <h4 className="text-base font-medium mb-3 text-foreground">
          Quick Actions
        </h4>
        <div className="flex flex-wrap gap-4">
          {[
            { key: "settings", label: "Moderation Settings", Icon: Settings },
            { key: "logs", label: "Moderation Logs / History", Icon: Clock },
          ].map((action) => (
            <button
              key={action.key}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card shadow-sm hover:shadow transition"
            >
              <action.Icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{action.label}</span>
            </button>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
