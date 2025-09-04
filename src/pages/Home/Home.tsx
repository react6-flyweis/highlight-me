import { StatCard } from "@/components/StatCard";
import { RecentActivityTable } from "@/components/RecentActivityTable";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import contentModeration from "@/assets/images/content-moderation.png";
import searchAnalysis from "@/assets/images/search-analysis.png";
import { PromoCard } from "@/components/PromoCard";

export default function Home() {
  return (
    <section className="flex flex-col gap-5">
      <div className="bg-[#e6f4f5] rounded-lg p-5 my-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-lg font-medium m-0">
            Welcome Back, Community Admin
          </h1>
          <p className="mt-2 text-sm">
            Here’s a quick overview of your community activity and moderation
            needs
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value="2,450"
          sub="+18% from last month"
          iconSrc="/icons/users.svg"
          iconAlt="users"
          to="/users"
        />

        <StatCard
          title="Total Posts"
          value="18,230"
          sub="+18% from last month"
          iconSrc="/icons/clipboard-list.svg"
          iconAlt="posts"
          to="/posts"
        />

        <StatCard
          title="Flagged Posts"
          value="124"
          sub="Required immediate review"
          iconSrc="/icons/message-report.svg"
          iconAlt="flagged"
          to="/posts/flagged"
        />

        <StatCard
          title="Running Contests"
          value="3"
          sub="Engage your community"
          iconSrc="/icons/trophy.svg"
          iconAlt="contests"
        />
      </div>

      <div className="flex gap-5">
        <div className="w-5/7">
          <div className="justify-between mb-4">
            <h2 className="text-base font-medium mb-2">Recent Activity</h2>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="border p-0">
                <TabsTrigger className=" w-20" value="all">
                  All
                </TabsTrigger>
                <TabsTrigger className="w-20" value="recent">
                  Recent
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <RecentActivityTable className="overflow-x-auto" />
          </div>
        </div>
        {/* Analytics and content moderation card */}
        <div className="w-2/7 hidden md:block">
          <div className="flex flex-col gap-4">
            <PromoCard
              title="Enhanced Analytics Tools"
              description="Dive deeper into your data with our new, intuitive analytics dashboards"
              imgSrc={searchAnalysis}
              imgAlt="Enhanced Analytics"
              actionLabel="Explore Features"
            />

            <PromoCard
              title="Streamlined Content Moderation"
              description="Effortlessly manage user-generated content with new moderation queues"
              imgSrc={contentModeration}
              imgAlt="Streamlined Content Moderation"
              actionLabel="Check Update"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
