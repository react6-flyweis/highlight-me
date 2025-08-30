import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
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

const editContestSchema = z.object({
  title: z.string().min(2, "Title is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  participationCriteria: z.string().optional(),
  prizeTier: z.string().optional(),
  maxWinners: z.number().int().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(["draft", "active", "archived"]).optional(),
});

type EditContestForm = z.infer<typeof editContestSchema>;

export function EditContestDialog({
  open,
  onOpenChange,
  initialValues,
  children,
  onUpdate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: Partial<EditContestForm>;
  children?: React.ReactNode;
  onUpdate?: (values: EditContestForm) => void;
}) {
  const form = useForm<EditContestForm>({
    resolver: zodResolver(editContestSchema),
    defaultValues: {
      title: initialValues?.title ?? "",
      startDate: initialValues?.startDate ?? "",
      endDate: initialValues?.endDate ?? "",
      participationCriteria: initialValues?.participationCriteria ?? "",
      prizeTier: initialValues?.prizeTier ?? "",
      maxWinners: initialValues?.maxWinners ?? undefined,
      description: initialValues?.description ?? "",
      status: initialValues?.status ?? "draft",
    },
  });

  React.useEffect(() => {
    // When initialValues change open form should update fields
    form.reset({
      title: initialValues?.title ?? "",
      startDate: initialValues?.startDate ?? "",
      endDate: initialValues?.endDate ?? "",
      participationCriteria: initialValues?.participationCriteria ?? "",
      prizeTier: initialValues?.prizeTier ?? "",
      maxWinners: initialValues?.maxWinners ?? undefined,
      description: initialValues?.description ?? "",
      status: initialValues?.status ?? "draft",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  async function handleUpdate(values: EditContestForm) {
    console.log("Update contest", values);
    if (onUpdate) onUpdate(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle>Edit contest</DialogTitle>
          <DialogDescription>
            Modify contest details and update when ready.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contest Title</FormLabel>
                    <FormControl>
                      <Input id="title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input id="startDate" type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="participationCriteria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Criteria fields</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(val) => field.onChange(val)}
                        value={field.value ?? ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="invite">Invite only</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prizeTier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prize Tiers</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(val) => field.onChange(val)}
                        value={field.value ?? ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="most_liked">Most Liked</SelectItem>
                          <SelectItem value="most_commented">
                            Most Commented
                          </SelectItem>
                          <SelectItem value="most_shared">
                            Most Shared
                          </SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="sm:col-span-1">
                    <FormLabel>Contest Description</FormLabel>
                    <FormControl>
                      <Textarea id="description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxWinners"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Max number of winners</FormLabel>
                      <FormControl>
                        <Input
                          id="maxWinners"
                          type="number"
                          min={1}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const v = e.target.value;
                            field.onChange(v === "" ? undefined : Number(v));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input id="endDate" type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Toggle</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(val) => field.onChange(val)}
                        value={field.value ?? "draft"}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Update
              </Button>
            </div>
          </form>
        </Form>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditContestDialog;
