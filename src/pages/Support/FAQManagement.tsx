import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { DataTable, type DataTableRef } from "@/components/table/DataTable";
import { type ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Eye, Edit, Trash2, Funnel } from "lucide-react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { FAQEditor } from "./FAQEditor";
import { AddFAQDialog } from "@/components/Support/AddFAQDialog";
import { EditFAQDialog } from "@/components/Support/EditFAQDialog";
import { DeleteCategoryDialog } from "@/components/Support/DeleteCategoryDialog";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const sampleFaqs = new Array(6).fill(0).map((_, i) => ({
  id: i + 1,
  question: "How do I reset my password?",
  category: "Account",
  status: "Low",
  updated: "2024-03-10",
}));

type FAQItem = (typeof sampleFaqs)[number];

// columns will be defined inside the component so navigation hooks can be used

export default function FAQManagement() {
  const tableRef = useRef<DataTableRef<FAQItem> | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const navigate = useNavigate();

  const columns: ColumnDef<FAQItem, unknown>[] = [
    {
      accessorKey: "question",
      header: "Question",
      cell: ({ getValue }) => (
        <span className="text-sm">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => (
        <span className="inline-flex items-center rounded-md bg-green-200 px-2 py-1 text-xs font-medium text-green-500">
          {getValue<string>()}
        </span>
      ),
    },
    {
      accessorKey: "updated",
      header: "Last Updated",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            aria-label="View FAQ"
            onClick={() => {
              const id = (row.original as FAQItem).id;
              navigate(`/support/faqs/${id}`);
            }}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <EditFAQDialog
            trigger={
              <Button variant="ghost" size="sm" aria-label="Edit FAQ">
                <Edit className="w-4 h-4" />
              </Button>
            }
            initialValues={{
              question: (row.original as FAQItem).question,
              category: (row.original as FAQItem).category,
              answer: "",
            }}
            onSave={(payload) => {
              console.log("FAQ edited:", payload);
            }}
          />
          <DeleteCategoryDialog
            trigger={
              <Button variant="ghost" size="sm" aria-label="Delete FAQ">
                <Trash2 className="w-4 h-4" />
              </Button>
            }
            name={(row.original as FAQItem).category}
            onConfirm={() => {
              console.log(
                "Confirmed delete category:",
                (row.original as FAQItem).category
              );
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <PageLayout
      title="FAQ Management"
      actions={
        <div className="flex items-center gap-3">
          <AddFAQDialog
            onSave={(payload) => {
              console.log("FAQ saved:", payload);
            }}
          />

          <Button
            variant="outline"
            onClick={() => navigate("/support/faqs-categories")}
          >
            Manage Categories
          </Button>
        </div>
      }
    >
      <div className="my-5 flex justify-end gap-3 items-center">
        <Input
          placeholder="Search by question title or content..."
          value={search}
          onChange={(e) => {
            const val = e.target.value;
            setSearch(val);
            const table = tableRef.current;
            if (!table) return;
            if (!val) {
              table.setColumnFilters((old) =>
                old.filter((f) => f.id !== "question")
              );
              return;
            }
            table.setColumnFilters((old) => [
              ...old.filter((f) => f.id !== "question"),
              { id: "question", value: val },
            ]);
          }}
          aria-label="Search FAQs"
          className="w-fit"
        />

        <div className="flex items-center gap-2">
          <div>
            <label className="sr-only">Category</label>
            <Select value={category} onValueChange={(v) => setCategory(v)}>
              <SelectTrigger size="sm" className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Account">Account</SelectItem>
                <SelectItem value="Billing">Billing</SelectItem>
                <SelectItem value="Technical">Technical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const table = tableRef.current;
              if (!table) return;
              if (!category || category === "all") {
                table.setColumnFilters((old) =>
                  old.filter((f) => f.id !== "category")
                );
                return;
              }
              table.setColumnFilters((old) => [
                ...old.filter((f) => f.id !== "category"),
                { id: "category", value: category },
              ]);
            }}
            className="flex items-center gap-2 rounded-full"
          >
            <Funnel className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={sampleFaqs} ref={tableRef} />

      <div className="my-6">
        <FAQEditor
          onSubmit={(payload) => {
            // for now just log; in future wire API
            console.log("FAQ saved:", payload);
          }}
        />
      </div>
    </PageLayout>
  );
}
