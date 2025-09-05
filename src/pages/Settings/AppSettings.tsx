import { Link } from "react-router";
import { AppSettingsNav } from "@/components/layouts/AppSettingsNav";
import { Clock, Camera, MessageSquare } from "lucide-react";

export default function AppSettings() {
  const cards = [
    {
      title: "Post window settings",
      desc: "Define specific timeframes when users are allowed to publish content, ensuring compliance with operational hours or content schedules.",
      to: "/settings/post-window",
      imageUrl: "https://picsum.photos/seed/post-window/800/400",
      icon: Clock,
    },
    {
      title: "Media Upload Limits",
      desc: "Set maximum file sizes and durations for photos and videos to optimize storage, bandwidth, and content quality on the platform.",
      to: "/settings/media-limits",
      imageUrl: "https://picsum.photos/seed/media-limits/800/400",
      icon: Camera,
    },
    {
      title: "Custom Messages",
      desc: "Manage custom messages displayed for various system events, user notifications, or platform restrictions, ensuring clear communication.",
      to: "/settings/messages",
      imageUrl: "https://picsum.photos/seed/custom-messages/800/400",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">App Configuration Dashboard</h1>
      </div>

      <AppSettingsNav />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.title}
              className="bg-white rounded-lg rounded-t-xl shadow-sm border flex flex-col overflow-hidden"
            >
              <div className="relative h-36 bg-gray-100">
                <img
                  src={c.imageUrl}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col items-center text-center">
                <div className="mb-3">
                  {/* lucide icon (no circular wrapper) */}
                  <Icon size={24} className="text-primary" />
                </div>

                <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
                <p className="text-sm text-slate-500">{c.desc}</p>

                <div className="mt-6 w-full">
                  <Link
                    to={c.to}
                    className="inline-block w-full text-center border rounded px-4 py-2 text-primary"
                  >
                    Manage Settings
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
