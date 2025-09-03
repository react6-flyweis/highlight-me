import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2Icon, EditIcon } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

type Category = { id: number; name: string; description: string };

type Props = {
  categories: Category[];
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
};

export const CategoriesTable: React.FC<Props> = ({
  categories,
  onEdit,
  onRemove,
}) => {
  return (
    <div className="col-span-12 lg:col-span-8">
      <div className="bg-card border rounded-md p-6">
        <h3 className="font-semibold">Existing Categories</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Manage your current post categories.
        </p>

        <div className="mt-2">
          {/* Bordered table wrapper to match design */}
          <div className="border rounded-md overflow-hidden">
            <Table className="w-full text-sm">
              <TableHeader>
                <tr className="text-left text-muted-foreground">
                  <TableHead className="w-48 p-3">Category Name</TableHead>
                  <TableHead className="p-3">Description</TableHead>
                  <TableHead className="w-28 p-3">Actions</TableHead>
                </tr>
              </TableHeader>
              <TableBody>
                {categories.map((c) => (
                  <TableRow key={c.id} className="border-t last:border-b">
                    <TableCell className="p-3 align-top font-medium w-48">
                      {c.name}
                    </TableCell>
                    <TableCell className="p-3 align-top whitespace-normal break-words max-w-[42rem] text-sm">
                      {c.description}
                    </TableCell>
                    <TableCell className="p-3 align-top">
                      <div className="flex gap-2 items-center justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(c.id)}
                        >
                          <EditIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemove(c.id)}
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
