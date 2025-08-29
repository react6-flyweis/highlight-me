import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
  onConfirm: (values: { duration: string; reason?: string }) => void;
};

const durations = [
  { value: "1_day", label: "1 day" },
  { value: "7_days", label: "7 days" },
  { value: "30_days", label: "30 days" },
  { value: "custom", label: "Custom" },
  { value: "permanent", label: "Permanent" },
];

const schema = z.object({
  duration: z.string().min(1, "Select a duration"),
  reason: z.string().optional(),
});

export function SuspendUserDialog({
  open,
  onOpenChange,
  userName,
  onConfirm,
}: Props) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { duration: "", reason: "" },
  });

  const submit = (vals: z.infer<typeof schema>) => {
    onConfirm(vals);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Suspend User</DialogTitle>
          <DialogDescription>
            Suspend {userName ?? "this user"} for a selected duration and
            provide an optional reason.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="grid gap-4 pt-2"
          >
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select duration</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Durations</SelectLabel>
                          {durations.map((d) => (
                            <SelectItem key={d.value} value={d.value}>
                              {d.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason field</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[8rem]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="px-10 border-primary"
                type="button"
              >
                Cancel
              </Button>
              <Button className="px-10" type="submit">
                Suspend
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default SuspendUserDialog;
