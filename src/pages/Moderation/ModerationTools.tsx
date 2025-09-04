import { ModerationNav } from "@/components/Moderation/moderationNav";
import { PageLayout } from "@/components/layouts/PageLayout";
import {
  Flag,
  ClipboardList,
  Settings,
  Clock,
  EyeOff,
  BarChart2,
} from "lucide-react";

export default function ModerationTools() {
  return (
    <PageLayout title="Moderation Tools">
      <ModerationNav />

      <header className="mb-4">
        <h3 className="text-lg font-semibold">Current Status Overview</h3>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {(() => {
          const cards = [
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
              subtitle: "Moderations action this month",
              value: "1.2M",
              Icon: BarChart2,
            },
          ];

          return cards.map((card) => {
            const CardIcon = card.Icon;
            return (
              <div
                key={card.key}
                className="relative p-6 rounded-lg shadow-sm overflow-hidden bg-white hover:bg-sky-50"
              >
                <div className="absolute top-4 right-4 rounded-full p-2">
                  <CardIcon className="w-5 h-5" />
                </div>

                <h2 className="text-sm text-slate-600">{card.title}</h2>
                <p className="mt-1 text-xs text-slate-500">{card.subtitle}</p>
                <p className="text-3xl font-bold mt-4">{card.value}</p>
              </div>
            );
          });
        })()}
      </section>

      <section>
        <h4 className="text-base font-medium mb-3">Quick Actions</h4>
        <div className="flex flex-wrap gap-4">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow transition">
            <Settings className="w-4 h-4 text-slate-700" />
            <span className="text-sm">Moderation Settings</span>
          </button>

          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow transition">
            <Clock className="w-4 h-4 text-slate-700" />
            <span className="text-sm">Moderation Logs / History</span>
          </button>
        </div>
      </section>
    </PageLayout>
  );
}
