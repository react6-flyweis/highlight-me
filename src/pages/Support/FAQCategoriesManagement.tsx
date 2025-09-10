import { PageLayout } from "@/components/layouts/PageLayout";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { AddCategoryDialog } from "@/components/Support/AddCategoryDialog";
import { DeleteCategoryDialog } from "@/components/Support/DeleteCategoryDialog";
import { Edit, Trash2 } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

type CategoryRow = {
  id: number;
  name: string;
  articles: number;
};

const SAMPLE_CATEGORIES: CategoryRow[] = Array.from({ length: 10 }).map(
  (_, i) => ({
    id: i + 1,
    name: [
      "Getting Started",
      "Account Management",
      "Troubleshooting",
      "Billing & Payments",
      "Technical Support",
      "Privacy & Security",
      "Feature Requests",
    ][i % 7],
    articles: 12,
  })
);

export default function FAQCategoriesManagementPage() {
  const columns: ColumnDef<CategoryRow>[] = [
    {
      accessorKey: "name",
      header: "Category Name",
      cell: ({ getValue }) => (
        <span className="text-sm">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: "articles",
      header: "Articles",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const orig: CategoryRow = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              aria-label="Edit Category"
              onClick={() => {
                // TODO: open edit dialog / navigate to edit page
                console.log("Edit category:", orig.name);
              }}
            >
              <Edit className="w-4 h-4" />
            </Button>

            <DeleteCategoryDialog
              trigger={
                <Button variant="ghost" size="sm" aria-label="Delete Category">
                  <Trash2 className="w-4 h-4" />
                </Button>
              }
              name={orig.name}
              onConfirm={() => {}}
            />
          </div>
        );
      },
    },
  ];

  return (
    <PageLayout
      title="FAQ Category Management"
      actions={<AddCategoryDialog onAdd={() => {}} />}
    >
      <DataTable columns={columns} data={SAMPLE_CATEGORIES} />
    </PageLayout>
  );
}
