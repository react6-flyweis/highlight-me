import { PageLayout } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { TierParticipationDonut } from "@/components/charts/TierParticipationDonut";
import { WeeklyContestBar } from "@/components/charts/WeeklyContestBar";
import { ContestEngagementLine } from "@/components/charts/ContestEngagementLine";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function ContestAnalytics() {
  const performers = [
    {
      rank: 1,
      name: "Alice Wonderland",
      totalEntries: 80,
      avgScore: "92%",
      tier: "Gold",
      submissions: 15,
    },
    {
      rank: 2,
      name: "Alice Wonderland",
      totalEntries: 75,
      avgScore: "88%",
      tier: "Silver",
      submissions: 12,
    },
    {
      rank: 3,
      name: "Alice Wonderland",
      totalEntries: 50,
      avgScore: "70%",
      tier: "Bronze",
      submissions: 10,
    },
    {
      rank: 4,
      name: "Alice Wonderland",
      totalEntries: 30,
      avgScore: "68%",
      tier: "Gold",
      submissions: 9,
    },
    {
      rank: 5,
      name: "Alice Wonderland",
      totalEntries: 80,
      avgScore: "65%",
      tier: "Silver",
      submissions: 8,
    },
    {
      rank: 6,
      name: "Alice Wonderland",
      totalEntries: 80,
      avgScore: "50%",
      tier: "Silver",
      submissions: 7,
    },
  ];

  return (
    <PageLayout
      title="Contest Analytics"
      actions={
        <div className="flex items-center gap-3">
          <Button size="sm">Export PDF</Button>
          <Button size="sm">Export CSV</Button>
        </div>
      }
    >
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          <Card className="bg-teal-100 border-0 shadow-none rounded-md overflow-hidden gap-0 py-4">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl text-primary">
                    Summer Photo Challenge 2024
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    Overview of the contest details and current status.
                  </CardDescription>
                </div>

                <div>
                  <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-sm font-medium shadow-sm">
                    Active
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="mt-3 space-y-1">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <img
                    src="/icons/trophy.svg"
                    alt="trophy"
                    className="w-5 h-5 opacity-80"
                  />
                  <span>
                    <strong>Dates:</strong> July 1, 2024 - August 15, 2024
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <img
                    src="/icons/trophy.svg"
                    alt="trophy"
                    className="w-5 h-5 opacity-80"
                  />
                  <span>
                    <strong>Goal:</strong> Drive engagement and discover new
                    talent.
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            title="Total Entries"
            value="1,280"
            sub="+15% vs. last week"
            iconSrc="/icons/clipboard-list.svg"
            iconAlt="entries"
          />

          <StatCard
            title="Unique Participants"
            value="1,280"
            sub="+10% vs. last week"
            iconSrc="/icons/users.svg"
            iconAlt="participants"
          />
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="shadow-lg">
          <CardHeader className="px-4">
            <CardTitle>Entries Per Week</CardTitle>
            <CardDescription>
              Total contest entries over the last 6 weeks.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4">
            <WeeklyContestBar height={220} />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="px-4">
            <CardTitle>Winning Post Engagement</CardTitle>
            <CardDescription>
              Average likes and shares for winning posts over 6 weeks.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4">
            <ContestEngagementLine height={220} />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="px-4">
            <CardTitle>Tier Participation Split</CardTitle>
            <CardDescription>
              Distribution of participants across different contest tiers.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 flex items-center justify-center">
            <TierParticipationDonut height={220} />
          </CardContent>
        </Card>
      </section>

      <section className="mt-6">
        <h3 className="text-xl font-semibold">Top Performers</h3>
        <p className="mb-3 text-muted-foreground text-sm">
          Leading participants in the current contest.
        </p>
        <Card className="shadow-none rounded-md px-4 py-2">
          <Table>
            <TableHeader>
              <tr>
                <TableHead className="w-12 text-center">Rank</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Total Entries</TableHead>
                <TableHead className="text-center">Avg. Score</TableHead>
                <TableHead className="text-center">Tier</TableHead>
                <TableHead className="text-center">Submissions</TableHead>
              </tr>
            </TableHeader>

            <TableBody>
              {performers.map((p) => (
                <TableRow key={p.rank}>
                  <TableCell className="w-12 text-center text-sm font-medium text-muted-foreground">
                    {p.rank}
                  </TableCell>

                  <TableCell className="text-center text-sm">
                    <div className="truncate text-center">{p.name}</div>
                  </TableCell>

                  <TableCell className="text-center text-sm">
                    {p.totalEntries}
                  </TableCell>

                  <TableCell className="text-center text-sm">
                    {p.avgScore}
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="flex items-center justify-center">
                      <Badge
                        className={`px-3 py-1 w-24 h-9 rounded text-sm ${
                          p.tier === "Gold"
                            ? "bg-amber-100 text-amber-800"
                            : p.tier === "Silver"
                            ? "bg-slate-100 text-slate-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {p.tier}
                      </Badge>
                    </div>
                  </TableCell>

                  <TableCell className="text-center text-sm">
                    {p.submissions}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>
    </PageLayout>
  );
}
