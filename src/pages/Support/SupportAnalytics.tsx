import AvgResponseDonut from "@/components/Support/charts/AvgResponseDonut";
import TicketVolumeBar from "@/components/Support/charts/TicketVolumeBar";
import FeedbackCategoriesDonut from "@/components/Support/charts/FeedbackCategoriesDonut";
import AvgResponseLine from "@/components/Support/charts/AvgResponseLine";
import AvgResolutionCard from "@/components/Support/charts/AvgResolutionCard";
import { PageLayout } from "@/components/layouts/PageLayout";

export default function SupportAnalytics() {
  return (
    <PageLayout title="Analytics Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <AvgResponseDonut />
        <AvgResolutionCard />

        <TicketVolumeBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeedbackCategoriesDonut />
        <div className="md:col-span-2">
          <AvgResponseLine />
        </div>
      </div>
    </PageLayout>
  );
}
