import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const faqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  category: z.string().min(1, "Category is required"),
  answer: z.string().optional(),
});

type FAQFormValues = z.infer<typeof faqSchema>;

type Props = {
  trigger?: React.ReactNode;
  initialValues?: Partial<FAQFormValues>;
  onSave?: (values: FAQFormValues) => void;
};

export const EditFAQDialog: React.FC<Props> = ({
  trigger,
  initialValues,
  onSave,
}) => {
  const form = useForm<FAQFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: initialValues?.question ?? "",
      category: initialValues?.category ?? "General",
      answer: initialValues?.answer ?? "",
    },
  });

  useEffect(() => {
    // whenever initialValues change, update the form
    form.reset({
      question: initialValues?.question ?? "",
      category: initialValues?.category ?? "General",
      answer: initialValues?.answer ?? "",
    });
  }, [initialValues, form]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle className="text-lg">Edit FAQ</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit((v) => {
              onSave?.(v);
              form.reset(v);
            })}
          >
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded" />
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
                    <FormLabel>Answer</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="rounded h-40" />
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
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full rounded">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General">General</SelectItem>
                          <SelectItem value="Account">Account</SelectItem>
                          <SelectItem value="Billing">Billing</SelectItem>
                          <SelectItem value="Technical">Technical</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="sm:justify-center">
              <DialogClose asChild>
                <Button variant="outline" className="w-32 rounded">
                  Cancel
                </Button>
              </DialogClose>

              <DialogClose asChild>
                <Button
                  className="w-32 rounded"
                  onClick={() => {
                    form.handleSubmit((v) => onSave?.(v))();
                  }}
                >
                  Save Changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
