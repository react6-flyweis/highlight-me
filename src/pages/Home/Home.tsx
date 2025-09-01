import { StatCard } from "@/components/StatCard";
import { Table } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        />

        <StatCard
          title="Total Posts"
          value="18,230"
          sub="+18% from last month"
          iconSrc="/icons/clipboard-list.svg"
          iconAlt="posts"
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

      <div className="flex">
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
            <Table className="overflow-x-auto">
              <thead>
                <tr className="text-left font-semibold text-gray-500 border-b">
                  <th className="py-3 px-4">ITEM</th>
                  <th className="py-3 px-4">TYPE</th>
                  <th className="py-3 px-4">LAST UPDATED</th>
                  <th className="py-3 px-4">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="">
                  <td className="py-4 px-4">User Onboarding flow</td>
                  <td className="py-4 px-4 text-gray-600">Workflow</td>
                  <td className="py-4 px-4 text-gray-600">2 hours ago</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-teal-600 text-white text-xs">
                      Completed
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-4">New Product announcement</td>
                  <td className="py-4 px-4 text-gray-600">Post</td>
                  <td className="py-4 px-4 text-gray-600">Yesterday</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-200 text-gray-700 text-xs">
                      Draft
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-4">Q3 Performance</td>
                  <td className="py-4 px-4 text-gray-600">Analytics</td>
                  <td className="py-4 px-4 text-gray-600">3 days ago</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-teal-600 text-white text-xs">
                      Generated
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-4">Summer photo Contest</td>
                  <td className="py-4 px-4 text-gray-600">Contest</td>
                  <td className="py-4 px-4 text-gray-600">1 week ago</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-200 text-gray-700 text-xs">
                      Active
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-4">Admin Panel customization</td>
                  <td className="py-4 px-4 text-gray-600">Settings</td>
                  <td className="py-4 px-4 text-gray-600">2 week ago</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-200 text-gray-700 text-xs">
                      Saved
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-4">Beta Tester</td>
                  <td className="py-4 px-4 text-gray-600">User Group</td>
                  <td className="py-4 px-4 text-gray-600">2 week ago</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-200 text-gray-700 text-xs">
                      pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <div className="w-2/7"></div>
      </div>
    </section>
  );
}
