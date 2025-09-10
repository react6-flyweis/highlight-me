import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layouts/PageLayout";
import { useNavigate } from "react-router";

export default function FAQDetail() {
  const navigate = useNavigate();

  // sample data — in future this should come from API by id
  const faq = {
    id: 1,
    question: "How do I reset my password?",
    category: "Account",
    status: "Active",
    answer:
      "Details: The application consistently crashes immediately after launching on Android 12. I've tried reinstalling, clearing cache, and restarting my device, but the issue persists. This makes the app unusable. Please investigate and provide a solution.",
    keywords: "faq,Help",
    createdBy: "Admin",
    dateCreated: "12-12-2025",
    version: "1.0",
  };

  return (
    <PageLayout title="FAQ Management > View">
      <div className="p-6 bg-white border rounded shadow-sm">
        <h2 className="text-lg font-semibold mb-4">View FAQ</h2>

        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-slate-600">Question</div>
            <div className="mt-1 text-base">{faq.question}</div>
          </div>

          <div className="flex gap-8">
            <div>
              <div className="text-sm font-medium text-slate-600">Category</div>
              <div className="mt-1 text-base">{faq.category}</div>
            </div>

            <div>
              <div className="text-sm font-medium text-slate-600">Status</div>
              <div className="mt-1 text-base text-teal-600">{faq.status}</div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-600">Answer</div>
            <div className="mt-2 text-sm text-slate-700">{faq.answer}</div>
          </div>

          <hr className="my-2" />

          <div className="grid grid-cols-2 gap-4 text-sm text-slate-700">
            <div>
              <div className="text-xs text-slate-500">Keywords</div>
              <div className="mt-1">{faq.keywords}</div>
            </div>

            <div>
              <div className="text-xs text-slate-500">Created by</div>
              <div className="mt-1">{faq.createdBy}</div>
            </div>

            <div>
              <div className="text-xs text-slate-500">Date Created</div>
              <div className="mt-1">{faq.dateCreated}</div>
            </div>

            <div>
              <div className="text-xs text-slate-500">Version</div>
              <div className="mt-1">{faq.version}</div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              className="rounded w-40"
              onClick={() => {
                navigate(-1);
              }}
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
