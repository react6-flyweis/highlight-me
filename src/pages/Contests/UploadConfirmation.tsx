import { useState } from "react";
import { useLocation } from "react-router";
import { PageLayout } from "@/components/layouts/PageLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadSuccessDialog } from "@/components/Contests/UploadSuccessDialog";

interface WinnerRow {
  name?: string;
  username?: string;
  email?: string;
  prizeTier?: string;
  status?: string;
}

export default function UploadConfirmation() {
  const { state } = useLocation();

  const payload = state ?? null;
  const [successOpen, setSuccessOpen] = useState(false);

  const totalWinners = Array.isArray(payload?.rows) ? payload.rows.length : 0;
  const errorsFound = payload?.errors ?? 0;

  return (
    <PageLayout title="Upload Confirmation">
      <Card className="rounded">
        <CardHeader>
          <CardTitle
            className="text-xl font-semibold
          "
          >
            Upload Winner(s) - Confirmation
          </CardTitle>
          <CardDescription>
            Simulated form for demonstration. In a real app, this would contain
            complex input fields.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!payload ? (
            <div className="text-sm text-muted-foreground">
              No data received.
            </div>
          ) : (
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <strong>Selected Contest:</strong> {payload.contest}
              </div>
              <div>
                <strong>Selected Prize Tier:</strong> {payload.prizeTier}
              </div>
              <div>
                <strong>Shipping Address:</strong>{" "}
                {payload.shippingAddress || "-"}
              </div>
              <div>
                <strong>Contact Number:</strong> {payload.contactNumber || "-"}
              </div>
              <div>
                <strong>Uploaded File:</strong>{" "}
                {payload.file ? payload.file.name || "(file)" : "No file"}
              </div>

              <div>
                <strong>Winners:</strong>
                <ul className="list-disc list-inside mt-2 text-sm text-foreground">
                  {Array.isArray(payload.rows) && payload.rows.length > 0 ? (
                    payload.rows.map((r: WinnerRow, i: number) => (
                      <li key={i} className="mb-1">
                        {r.name || "(no name)"} — {r.username || "-"} —{" "}
                        {r.email || "-"} — {r.prizeTier} — {r.status}
                      </li>
                    ))
                  ) : (
                    <li>No winners</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="flex items-center gap-3 justify-center mt-6">
        <Button
          type="button"
          className="rounded h-11 border-primary min-w-32"
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="rounded h-11 border-primary min-w-32"
          variant="outline"
        >
          Save as Draft
        </Button>
        <Button
          type="button"
          className="rounded h-11 min-w-32"
          onClick={() => setSuccessOpen(true)}
          disabled={!payload}
        >
          Upload Winner(s)
        </Button>
      </div>

      <UploadSuccessDialog
        open={successOpen}
        onOpenChange={setSuccessOpen}
        totalWinners={totalWinners}
        errorsFound={errorsFound}
      />
    </PageLayout>
  );
}
