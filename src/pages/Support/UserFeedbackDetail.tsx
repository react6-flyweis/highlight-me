import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layouts/PageLayout";

export default function UserFeedbackDetail() {
  const feedback = {
    title: "App Crashes on Startup",
    fromName: "John Doe",
    fromEmail: "john.doe@example.com",
    date: "October 26, 2023",
    details:
      "The application consistently crashes immediately after launching on Android 12. I've tried reinstalling, clearing cache, and restarting my device, but the issue persists. This makes the app unusable. Please investigate and provide a solution.",
    status: "Unresolved",
  };

  return (
    <PageLayout title="User Feedback Detail">
      <p className="text-sm text-slate-600 mb-6">
        This area represents the content of the "Feedback Detail View" over
        which the "Assign Team Member" modal is displayed. It would typically
        show comprehensive details of a single feedback entry, including user
        information, attachments, and actions. For this static screen, it acts
        as a visual placeholder.
      </p>

      <div className="bg-cyan-50 border border-cyan-100 rounded p-6">
        <h3 className="text-base font-semibold mb-3">
          Customer Feedback: "{feedback.title}"
        </h3>

        <div className="text-sm text-slate-700 mb-4">
          <div className="mb-2">
            <strong className="font-medium">From:</strong> {feedback.fromName} (
            {feedback.fromEmail})
          </div>

          <div className="mb-4">
            <strong className="font-medium">Date:</strong> {feedback.date}
          </div>

          <div className="mb-4 text-slate-800">{feedback.details}</div>

          <div className="text-sm text-slate-700 text-right">
            Status: <span className="font-medium">{feedback.status}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <Button
          size="lg"
          className="rounded border-primary text-primary"
          variant="outline"
        >
          Archive Feedback
        </Button>
        <Button size="lg" className="rounded">
          Mark as Resolved
        </Button>
      </div>
    </PageLayout>
  );
}
