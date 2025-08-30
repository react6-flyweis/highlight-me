import { PageLayout } from "@/components/layouts/PageLayout";
import { ContestsNav } from "@/components/Contests/ContestsNav";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function PrizeCriteriaPage() {
  return (
    <PageLayout title="Contests & Prizes Management">
      <ContestsNav />

      <div>
        <h3 className="text-xl font-semibold">Weekly Contest Details</h3>
        <div className="text-muted-foreground mt-1">
          Configure and manage the essential settings for your ongoing and
          upcoming weekly contests.
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <Card className="p-4 rounded">
          <div className="relative">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-muted-foreground">
                  Contest overview
                </div>
                <h3 className="text-2xl font-semibold mt-1">Contest #104</h3>
                <div className="text-sm text-muted-foreground mt-1">
                  Current weekly contest
                </div>
              </div>

              {/* calendar icon box aligned top-right like the reference */}
              <div className="ml-4">
                <div className="w-10 h-10 border rounded flex items-center justify-center text-muted-foreground">
                  {/* small calendar placeholder */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="16"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M16 3v4M8 3v4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <div className="text-2xl font-bold">12,345</div>
                <div className="text-muted-foreground">Total participants</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">Active</div>
                <div className="text-muted-foreground">Contest status</div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground mt-4">
              <span className="font-medium">Top Performer:</span> Jane Doe
            </div>
          </div>
        </Card>

        <Card className="p-4 rounded">
          <h4 className="text-base font-semibold">Contest Period</h4>
          <p className="text-sm text-muted-foreground mt-2">
            Define the start and end dates for this contest.
          </p>
          <div className="border rounded mt-3 p-3 text-sm">
            Aug 21,2025 - Sep 21, 2025
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <Card className="rounded">
          <CardHeader>
            <CardTitle className="text-base">
              Set Weekly Prize Criteria
            </CardTitle>
            <CardDescription>
              Select the key performance indicators for this week's winners.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-0">
            <div className="mt-1 space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="most-liked" defaultChecked />
                <label htmlFor="most-liked" className="text-sm">
                  Most Liked Post
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="most-commended" defaultChecked />
                <label htmlFor="most-commended" className="text-sm">
                  Most Commended Post
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="most-shared" defaultChecked />
                <label htmlFor="most-shared" className="text-sm">
                  Most Shared Post
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded">
          <CardHeader>
            <CardTitle className="text-base">Contest Description</CardTitle>
            <CardDescription>
              Provide a brief overview or specific rules for the contest
              participants.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-0 text-sm text-muted-foreground">
            <p>
              This week's contest focuses on viral engagement. Participants must
              create original content. Winners will be selected based on highest
              engagement scores. Ensure content aligns with platform guidelines.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded">
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="mt-0 text-sm text-muted-foreground">
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Contest parameters updated by Admin. (Just now)</li>
              <li>New prize criteria saved. (5 minutes ago)</li>
              <li>Contest period extended to Jan 7th. (1 hour ago)</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-center">
        <Button className="rounded">Save Contest Settings</Button>
      </div>
    </PageLayout>
  );
}
