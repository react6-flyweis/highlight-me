import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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

type Props = {
  onCreate: (payload: { name: string; description: string }) => void;
};

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export const CategoryForm: React.FC<Props> = ({ onCreate }) => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", description: "" },
  });

  function onSubmit(values: CategoryFormValues) {
    onCreate({
      name: values.name.trim(),
      description: values.description?.trim() ?? "",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="col-span-12 lg:col-span-4"
      >
        <div className="bg-card border rounded-md p-5 space-y-4">
          <h3 className="font-semibold">Create New Category</h3>
          <p className="text-sm text-muted-foreground">
            Define a new category for your posts.
          </p>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    className="rounded"
                    placeholder="e.g., Hiking Adventures"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    id="description"
                    className="rounded"
                    placeholder="Briefly describe what this category entails..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center mt-10">
            <Button className="rounded" type="submit">
              + Create Category
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
