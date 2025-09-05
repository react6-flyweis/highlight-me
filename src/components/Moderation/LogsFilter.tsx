import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

const logsSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  actionType: z.string().optional(),
  moderator: z.string().optional(),
  query: z.string().optional(),
});

export type LogsFormValues = z.infer<typeof logsSchema>;

type Props = {
  defaultValues?: Partial<LogsFormValues>;
  onApply?: (data: LogsFormValues) => void;
};

const ACTION_TYPES = ["All Action Types", "Delete", "Edit", "Flag", "Approve"];
const MODERATORS = ["All Moderators", "Alice", "Bob", "Charlie"];

export function LogsFilter({ defaultValues, onApply }: Props) {
  const form = useForm<LogsFormValues>({
    resolver: zodResolver(logsSchema),
    defaultValues: defaultValues ?? {},
  });

  const handleClear = () => {
    form.reset();
  };

  const handleApply = (data: LogsFormValues) => {
    onApply?.(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleApply)}
        className="p-6 bg-card rounded shadow-sm"
      >
        <h4 className="text-base font-medium mb-1 text-foreground">
          Filter Logs
        </h4>
        <p className="text-sm text-muted-foreground mb-6">
          Refine log entries by various criteria.
        </p>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start date</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Pick a date" type="date" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Pick a date" type="date" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="actionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Action Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Action Types" />
                    </SelectTrigger>
                    <SelectContent>
                      {ACTION_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="moderator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Moderator</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Moderators" />
                    </SelectTrigger>
                    <SelectContent>
                      {MODERATORS.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </section>

        <section className="mb-6">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search Content/User</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter content ID, user ID, or keywords..."
                    {...field}
                  />
                </FormControl>
                <FormDescription />
              </FormItem>
            )}
          />
        </section>

        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" onClick={handleClear} type="button">
            Clear Filters
          </Button>

          <Button type="submit" className="bg-primary text-white">
            Apply Filters
          </Button>
        </div>
      </form>
    </Form>
  );
}
