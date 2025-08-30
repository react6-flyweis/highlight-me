import { PageLayout } from "@/components/layouts/PageLayout";
import { ContestsNav } from "@/components/Contests/ContestsNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";

export default function PastWinnersPage() {
  const sampleWinners = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    name: "Emily Clark",
    prize: "Gaming PC Setup",
    date: "2023-11-15",
  }));

  return (
    <PageLayout title="Contests & Prizes Management">
      <ContestsNav />

      <div>
        <h3 className="text-xl font-semibold">Prize Tier Definition</h3>
        <div className="text-muted-foreground mt-1">
          Manage and track all past contest winners, including their awarded
          prizes and contest dates. You can upload in bulk or add entries
          manually.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <Card className="p-4 rounded">
          <CardContent className="mt-2 text-sm text-muted-foreground">
            <div className="h-40 bg-muted rounded flex items-center justify-center">
              <div className="text-center w-full">
                <img
                  src="/src/assets/icons/upload-cloud.png"
                  alt="upload winners"
                  className="mx-auto mb-3 h-20 object-contain"
                />
              </div>
            </div>
            <h3 className="text-lg text-center pt-3">
              Upload Winners via File
            </h3>
            <div className="py-3">
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                Upload CSV/Excel
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 rounded">
          <CardContent className="mt-2 text-sm text-muted-foreground">
            <div className="h-40 bg-muted rounded flex items-center justify-center">
              <div className="text-center w-full">
                <img
                  src="/src/assets/icons/trophy.png"
                  alt="add winner"
                  className="mx-auto mb-3 h-20 object-contain"
                />
              </div>
            </div>
            <h3 className="text-lg text-center pt-3">
              Upload Winners via File
            </h3>
            <div className="py-5">
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                Add Winner
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold">Recently Added Winners</h4>
        <p className="mb-3 text-muted-foreground">
          A list of all winners added to the system.
        </p>
        <Card className="p-0">
          <div className="overflow-auto">
            <table className="w-full table-auto text-sm">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="p-3">Winner Name</th>
                  <th className="p-3">Prize Won</th>
                  <th className="p-3">Contest Date</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sampleWinners.map((w) => (
                  <tr key={w.id} className="border-t">
                    <td className="p-3">{w.name}</td>
                    <td className="p-3">{w.prize}</td>
                    <td className="p-3">{w.date}</td>
                    <td className="p-3 flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Edit winner ${w.name}`}
                        className="p-0"
                      >
                        <EditIcon className="size-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Delete winner ${w.name}`}
                        className="p-0"
                      >
                        <TrashIcon className="size-5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}
