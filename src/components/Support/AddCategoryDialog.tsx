import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, "Category name is required"),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  onAdd?: (payload: FormValues) => void;
  trigger?: React.ReactNode;
};

export const AddCategoryDialog: React.FC<Props> = ({ onAdd, trigger }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "" },
  });

  function handleSubmit(values: FormValues) {
    onAdd?.(values);
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
      <DialogTrigger asChild>
        {trigger ?? <Button className="rounded">Add New Category</Button>}
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Add new category</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded"
                        placeholder="e.g., General Support"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3">
                <DialogClose asChild>
                  <Button variant="outline" className="w-40 rounded">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-40 rounded">
                  Save Category
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
