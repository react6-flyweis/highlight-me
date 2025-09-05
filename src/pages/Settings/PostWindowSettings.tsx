import { useMemo } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { AppSettingsNav } from "@/components/layouts/AppSettingsNav";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const postingSchema = z.object({
  timezone: z.string().min(1, "Timezone is required"),
  enabled: z.boolean(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  startHour: z.string().regex(/^([01]\d|2[0-3])$/, "Invalid hour"),
  startMinute: z.string().regex(/^[0-5]\d$/, "Invalid minute"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  endHour: z.string().regex(/^([01]\d|2[0-3])$/, "Invalid hour"),
  endMinute: z.string().regex(/^[0-5]\d$/, "Invalid minute"),
});

type PostingFormValues = z.infer<typeof postingSchema>;

const DEFAULTS: PostingFormValues = {
  timezone: "America/New_York",
  enabled: true,
  startDate: new Date().toISOString().slice(0, 10),
  startHour: "09",
  startMinute: "00",
  endDate: new Date().toISOString().slice(0, 10),
  endHour: "17",
  endMinute: "00",
};

export default function PostWindowSettings() {
  const form = useForm<PostingFormValues>({
    resolver: zodResolver(postingSchema),
    defaultValues: DEFAULTS,
  });

  const values = form.watch();

  const preview = useMemo(() => {
    if (!values.enabled) return "Posting window restrictions are disabled.";
    const start = `${values.startDate} ${values.startHour}:${values.startMinute}`;
    const end = `${values.endDate} ${values.endHour}:${values.endMinute}`;
    return `Posting is restricted between ${start} (${values.timezone}) and ${end} (${values.timezone}). Outside of this period, new content submissions will be disabled.`;
  }, [values]);

  function onReset() {
    form.reset(DEFAULTS);
  }

  function onSave(data: PostingFormValues) {
    // TODO: Replace with API call
    console.log("Saving posting window settings:", data);
  }

  return (
    <PageLayout title="Posting Window Settings">
      <AppSettingsNav />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">
          <section className="grid grid-cols-1 gap-6 mb-8">
            <div className="p-6 bg-card rounded shadow-sm">
              <h4 className="text-base font-medium mb-1 text-foreground">
                Posting Window Settings
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Restrict when new posts can be submitted to the system.
              </p>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timezone</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(val) => field.onChange(val)}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full rounded h-10!">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/New_York">
                              America/New_York (EST)
                            </SelectItem>
                            <SelectItem value="UTC">UTC</SelectItem>
                            <SelectItem value="America/Los_Angeles">
                              America/Los_Angeles (PST)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="enabled"
                  render={({ field }) => (
                    <FormItem className="flex justify-between items-center ">
                      <FormLabel>Enable Posting Window Restrictions</FormLabel>
                      <FormControl>
                        <Switch
                          checked={!!field.value}
                          onCheckedChange={(val) => field.onChange(!!val)}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-2">
                    Start Date & Time
                  </div>
                  <div className="grid grid-cols-4 gap-2 items-center">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormControl>
                            <Input
                              id="startDate"
                              type="date"
                              className="w-full rounded"
                              disabled={!values.enabled}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="startHour"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id="startHour"
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              maxLength={2}
                              className="rounded text-center"
                              disabled={!values.enabled}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="startMinute"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id="startMinute"
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              maxLength={2}
                              className="rounded text-center"
                              disabled={!values.enabled}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* seconds removed */}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-2">
                    End Date & Time
                  </div>
                  <div className="grid grid-cols-4 gap-2 items-center">
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormControl>
                            <Input
                              id="endDate"
                              type="date"
                              className="w-full rounded"
                              disabled={!values.enabled}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endHour"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id="endHour"
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              maxLength={2}
                              className="rounded text-center"
                              disabled={!values.enabled}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endMinute"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id="endMinute"
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              maxLength={2}
                              className="rounded text-center"
                              disabled={!values.enabled}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* seconds removed */}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-card rounded shadow-sm">
              <h4 className="text-base font-medium mb-3 text-foreground">
                Current Posting Window Preview
              </h4>

              <div className="p-4 rounded bg-blue-50 border-blue-200 text-sm text-muted-foreground">
                {preview}
              </div>
            </div>
          </section>

          <footer className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              className="rounded w-32 border-primary"
              onClick={onReset}
              type="button"
            >
              Cancel
            </Button>

            <Button size="lg" type="submit" className="rounded w-32">
              Save
            </Button>
          </footer>
        </form>
      </Form>
    </PageLayout>
  );
}
