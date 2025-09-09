import { StatCard } from "@/components/StatCard";

export default function SupportRequests() {
  return (
    <section className="">
      <h1 className="text-xl font-medium my-6">Support Requests</h1>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard
          title="Open Tickets"
          value="4"
          sub=""
          iconSrc="/icons/message-report.svg"
          iconAlt="open"
        />

        <StatCard
          title="Assigned to Me"
          value="3"
          sub=""
          iconSrc="/icons/users.svg"
          iconAlt="assigned"
        />

        <StatCard
          title="High Priority"
          value="4"
          sub=""
          iconSrc="/icons/clipboard-list.svg"
          iconAlt="priority"
        />

        <StatCard
          title="Unassigned Tickets"
          value="1"
          sub=""
          iconSrc="/icons/inbox.svg"
          iconAlt="unassigned"
        />
      </div>
    </section>
  );
}
