import { useState } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { HashtagsNav } from "@/components/Hashtags/HashtagsNav";
import { CategoryForm } from "@/components/Hashtags/CategoryForm";
import { CategoriesTable } from "@/components/Hashtags/CategoriesTable";

export default function HashtagsCategoryManagementPage() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Adventure",
      description:
        "Posts related to outdoor activities, travel, and exciting experiences.",
    },
    {
      id: 2,
      name: "Chill",
      description: "Relaxing content, slow-paced activities, and cozy moments.",
    },
    {
      id: 3,
      name: "Events",
      description:
        "Information about upcoming events, workshops, and gatherings.",
    },
    {
      id: 4,
      name: "Education",
      description:
        "Content focused on learning, tutorials, and academic topics.",
    },
    {
      id: 5,
      name: "Food & Drink",
      description:
        "Recipes, culinary experiences, restaurant reviews, and beverage guides.",
    },
    {
      id: 6,
      name: "Technology",
      description:
        "Articles on new gadgets, software, programming, and digital trends.",
    },
    {
      id: 7,
      name: "Fashion",
      description: "Latest trends in clothing, accessories, and style tips.",
    },
    {
      id: 8,
      name: "Sports",
      description:
        "News, analysis, and highlights from various athletic disciplines.",
    },
    {
      id: 9,
      name: "Arts & Culture",
      description:
        "Exploration of visual arts, music, literature, and cultural phenomena.",
    },
    {
      id: 10,
      name: "Health & Wellness",
      description:
        "Tips for physical and mental well-being, fitness, and nutrition.",
    },
  ] as { id: number; name: string; description: string }[]);
  // form state (kept locally in the form component)

  function createCategory(payload: { name: string; description: string }) {
    const next = {
      id: Date.now(),
      name: payload.name,
      description: payload.description,
    };
    setCategories((s) => [next, ...s]);
  }

  function removeCategory(id: number) {
    setCategories((s) => s.filter((c) => c.id !== id));
  }

  function editCategory() {}

  return (
    <PageLayout
      title="Category Management"
      subtitle="Create and manage hashtag categories."
    >
      <HashtagsNav />

      <div className="grid grid-cols-12 gap-6">
        <CategoryForm onCreate={createCategory} />
        <CategoriesTable
          categories={categories}
          onEdit={editCategory}
          onRemove={removeCategory}
        />
      </div>
    </PageLayout>
  );
}
