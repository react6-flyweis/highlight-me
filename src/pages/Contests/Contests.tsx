import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreateContestDialog } from "@/components/Contests/CreateContestDialog";
import { useState } from "react";
import { Plus, Download, EditIcon, Trash2, Edit3Icon } from "lucide-react";
import { EditContestDialog } from "@/components/Contests/EditContestDialog";
import { PageLayout } from "@/components/layouts/PageLayout";
import { ContestsNav } from "@/components/Contests/ContestsNav";
import { StatCard } from "@/components/StatCard";

export default function ContestsPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const prizes = [
    {
      id: "p1",
      title: "Branded T-Shirt",
      desc: "Premium Cotton tee with logo",
      badge: "5k-50k Tier",
      badgeClass: "bg-sky-100 text-sky-800",
    },
    {
      id: "p2",
      title: "Event Invitation",
      desc: "Exclusive meetup access",
      badge: "50k Tier",
      badgeClass: "bg-amber-100 text-amber-800",
    },
    {
      id: "p3",
      title: "Sticker Pack",
      desc: "Custom designed stickers",
      badge: "<5k Tier",
      badgeClass: "bg-emerald-100 text-emerald-800",
    },
  ];

  return (
    <PageLayout title="Contests & Prizes Management">
      <ContestsNav />

      {/* Parent card containing header actions and stats */}
      <Card className="p-4 gap-2 rounded">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold">Weekly Contest Details</h3>
            <div className="text-sm text-muted-foreground mt-1">
              Overview of active contests, participants and recent winners
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <EditContestDialog
              open={editOpen}
              onOpenChange={setEditOpen}
              initialValues={{
                title: "Weekly Contest",
                startDate: "2025-08-08",
                endDate: "2025-08-15",
                participationCriteria: "public",
                prizeTier: "tier1",
                maxWinners: 3,
                description: "Weekly highlight contest",
                status: "active",
              }}
              onUpdate={(vals) => console.log("Updated contest:", vals)}
            >
              <Button variant="outline">
                <EditIcon className="mr-2 h-4 w-4" /> Edit
              </Button>
            </EditContestDialog>
            {/* Dialog trigger for creating a contest */}
            <CreateContestDialog open={createOpen} onOpenChange={setCreateOpen}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                <span>New Contest</span>
              </Button>
            </CreateContestDialog>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Active Users"
            value="2,450"
            sub="Current tier: Branded March"
            iconSrc="/icons/users.svg"
          />

          <StatCard
            title="Active Contests"
            value="12"
            sub="Ends in 4 days"
            iconSrc="/icons/users.svg"
          />

          <StatCard
            title="Total Winners"
            value="24"
            sub="This Month"
            iconSrc="/icons/users.svg"
          />
        </div>
      </Card>

      {/* Prize Management card (from design attachment) */}
      <Card className="p-4 mt-4 gap-2 rounded">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold">Prize Management</h3>
            <div className="text-sm text-muted-foreground mt-1">
              Manage prizes, tiers and distribution
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Prize
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {prizes.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg overflow-hidden bg-card p-0"
            >
              <div className="h-28 bg-gradient-to-r from-rose-400 via-orange-400 to-pink-500" />
              <div className="p-4 flex items-start justify-between">
                <div>
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-muted-foreground">{p.desc}</div>
                  <div className="mt-2">
                    <span
                      className={`inline-block ${p.badgeClass} text-xs px-2 py-1 rounded`}
                    >
                      {p.badge}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Edit3Icon className="size-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PageLayout>
  );
}
