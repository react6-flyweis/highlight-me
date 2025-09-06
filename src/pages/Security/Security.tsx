import { FileClock, Trophy, User } from "lucide-react";
import { SecurityNav } from "./SecurityNav";
import { SecurityCard } from "@/components/Security/SecurityCard";

export default function SecurityPage() {
  const cards = [
    {
      title: "Audit Log",
      desc: "Review all system activities, user actions, and changes.",
      to: "/security/audit-log",
      icon: User,
      meta: "Last Entry: 2024-07-29 14:30",
    },
    {
      title: "IP Whitelisting",
      desc: "Manage allowed IP addresses for console access.",
      to: "/security/ip-whitelist",
      icon: FileClock,
      meta: "Active Rules: 5",
    },
    {
      title: "Multi-Factor Authentication",
      desc: "Configure and enforce MFA for enhanced security.",
      to: "/security/mfa",
      icon: Trophy,
      meta: "Status: Enabled",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="">
        <h1 className="mb-5 text-2xl font-semibold">
          App Configuration Dashboard
        </h1>
        <SecurityNav />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c) => (
          <SecurityCard
            key={c.title}
            title={c.title}
            desc={c.desc}
            to={c.to}
            icon={c.icon}
            meta={c.meta}
          />
        ))}
      </div>
    </div>
  );
}
