import { PageLayout } from "@/components/layouts/PageLayout";
import { HashtagsNav } from "@/components/Hashtags/HashtagsNav";
import { StatCard } from "@/components/StatCard";

export default function HashtagsCategoryPage() {
  return (
    <PageLayout
      title="Hashtags & Category"
      subtitle="Overview of trending hashtags and category insights."
    >
      <HashtagsNav />

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Hashtags"
          value="2,450"
          sub="+5% from last month"
          iconSrc="/icons/tag.svg"
          iconAlt="trophy"
          to="/hashtags-category"
        />

        <StatCard
          title="New Hashtags Today"
          value="12"
          sub="+18% from yesterday"
          iconSrc="/icons/plus.svg"
          iconAlt="new"
          to="/hashtags-category/management"
        />

        <StatCard
          title="Template Variants Count"
          value="25"
          sub="-2% this week"
          iconSrc="/icons/stack.svg"
          iconAlt="Template Variants Count"
          to="/hashtags-category/management"
        />
      </section>
    </PageLayout>
  );
}
