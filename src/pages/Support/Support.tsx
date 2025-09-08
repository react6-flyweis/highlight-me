import { StatCard } from "@/components/StatCard";
import { PopularTopics } from "@/components/Support/PopularTopics";
import { SupportTable } from "@/components/Support/SupportTable";

export default function Support() {
  return (
    <section className="">
      <h1 className="text-xl font-medium my-6">Support and Feedback Center</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="User Feedback"
          value="2,450"
          sub="Current tier: Branded March"
          iconSrc="/icons/users.svg"
          iconAlt="users"
        />

        <StatCard
          title="Support Requests"
          value="2,450"
          sub="Ends in 4 days"
          iconSrc="/icons/message-report.svg"
          iconAlt="requests"
        />

        <StatCard
          title="FAQ / Help Topics"
          value="2,450"
          sub="This Month"
          iconSrc="/icons/clipboard-list.svg"
          iconAlt="faqs"
        />
      </div>

      <PopularTopics />
      <SupportTable />
    </section>
  );
}
