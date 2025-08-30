import { PageLayout } from "@/components/layouts/PageLayout";
import { ContestsNav } from "@/components/Contests/ContestsNav";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PrizeTiersPage() {
  return (
    <PageLayout title="Contests & Prizes Management">
      <ContestsNav />

      <div>
        <h3 className="text-xl font-semibold">Prize Tier Definition</h3>
        <div className="text-muted-foreground mt-1">
          Define the prize tiers based on active user engagement. Each tier
          specifies a user count range and associated rewards.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <Card className="p-4 rounded">
          <CardHeader>
            <CardTitle className="text-sm">
              Tier 1: Less than 5000 users
            </CardTitle>
            <CardDescription className="text-xs">
              Define the rewards for this user count tier.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-2 text-sm text-muted-foreground">
            <div className="border rounded p-3 min-h-[80px]">
              Stickers, shoutouts on social media
            </div>
            <div className="mt-3">
              <Button variant="outline" className="w-full">
                Manage Associated Rewards
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-sm">
              Tier 2: 5000 to 50000 users
            </CardTitle>
            <CardDescription className="text-xs">
              Define the rewards for this user count tier.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-2 text-sm text-muted-foreground">
            <div className="border rounded p-3 min-h-[80px]">
              Exclusive branded merchandise like T-shirts, mugs
            </div>
            <div className="mt-3">
              <Button variant="outline" className="w-full">
                Manage Associated Rewards
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 rounded">
          <CardHeader>
            <CardTitle className="text-sm">Tier 3: Over 50000 users</CardTitle>
            <CardDescription className="text-xs">
              Define the rewards for this user count tier.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-2 text-sm text-muted-foreground">
            <div className="border rounded p-3 min-h-[80px]">
              VIP event invites, collaboration opportunities
            </div>
            <div className="mt-3">
              <Button variant="outline" className="w-full">
                Manage Associated Rewards
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 flex items-center justify-center rounded">
          <div className="w-full text-center text-muted-foreground">
            {/* placeholder blank card */}
            <div className="h-32 border-2 border-dashed rounded flex items-center justify-center">
              <span className="text-3xl text-muted-foreground">+</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 flex justify-center">
        <Button className="rounded">Save Tiers</Button>
      </div>
    </PageLayout>
  );
}
