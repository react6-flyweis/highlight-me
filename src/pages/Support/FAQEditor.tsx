import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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

const faqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  category: z.string().min(1, "Category is required"),
  answer: z.string().optional(),
  status: z.boolean().optional(),
});

type FAQFormValues = z.infer<typeof faqSchema>;

type Props = {
  onSubmit?: (payload: FAQFormValues) => void;
};

export const FAQEditor: React.FC<Props> = ({ onSubmit }) => {
  const form = useForm<FAQFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: "",
      category: "",
      answer: "",
      status: false,
    },
  });

  function handleSubmit(values: FAQFormValues) {
    // keep it simple: call callback then reset
    if (onSubmit) onSubmit(values);
    // don't fully reset status by default to keep draft state predictable
    form.reset({ ...values, question: "", answer: "" });
  }

  const submitAs = (publish: boolean) => {
    form.setValue("status", publish);
    form.handleSubmit(handleSubmit)();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="bg-card border rounded-md p-5">
          <h3 className="font-semibold">FAQ Editor</h3>
          <p className="text-sm text-muted-foreground">
            Create or edit frequently asked questions.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Title</FormLabel>
                  <FormControl>
                    <Input
                      id="question"
                      placeholder="e.g., How to reset my password?"
                      className="rounded"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      id="category"
                      placeholder="Select a category"
                      className="rounded"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer (Rich Text Editor)</FormLabel>
                  <FormControl>
                    <Textarea
                      id="answer"
                      className="h-40 rounded"
                      placeholder="Provide a detailed answer here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full flex items-center justify-between gap-3">
                  <FormLabel>
                    Status: {field.value ? "Published" : "Draft"}
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={(v) => field.onChange(!!v)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end">
              <div className="flex gap-3">
                <Button
                  className="rounded text-primary border-primary w-40"
                  variant="outline"
                  type="button"
                  onClick={() => submitAs(false)}
                >
                  Save
                </Button>
                <Button
                  className="rounded w-40"
                  type="button"
                  onClick={() => submitAs(true)}
                >
                  Publish
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
