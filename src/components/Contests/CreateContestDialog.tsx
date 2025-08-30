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

const contestSchema = z.object({
  title: z.string().min(2, "Title is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  participationCriteria: z.string().optional(),
  prizeTier: z.string().optional(),
  maxWinners: z.number().int().min(1),
  description: z.string().optional(),
});

type ContestForm = z.infer<typeof contestSchema>;

export function CreateContestDialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}) {
  const form = useForm<ContestForm>({
    resolver: zodResolver(contestSchema),
    defaultValues: {
      title: "",
      startDate: "",
      endDate: "",
      participationCriteria: "",
      prizeTier: "",
      description: "",
    },
  });

  async function onSubmit(values: ContestForm) {
    console.log("Create contest", values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle>Create a new contest</DialogTitle>
          <DialogDescription>
            Fill in contest details and publish when ready.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contest title</FormLabel>
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
                    <FormLabel>Date range</FormLabel>
                    <FormControl>
                      <Input id="dateRange" type="date" {...field} />
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
                    <FormLabel>Participation criteria</FormLabel>
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
                    <FormLabel>Prize tier assignment</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(val) => field.onChange(val)}
                        value={field.value ?? ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tier1">Tier 1</SelectItem>
                          <SelectItem value="tier2">Tier 2</SelectItem>
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
                    <FormLabel>Contest description</FormLabel>
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
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input id="time" type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={() => <FormItem className="hidden" />}
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
                Publish
              </Button>
            </div>
          </form>
        </Form>

        <DialogFooter>{/* footer reserved if needed */}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
