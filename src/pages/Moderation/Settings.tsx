import { ModerationNav } from "@/components/Moderation/moderationNav";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Bell, Clock } from "lucide-react";

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
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const settingsSchema = z.object({
  dailyEmail: z.boolean(),
  quietEnabled: z.boolean(),
  quietStart: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time"),
  quietEnd: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time"),
  sentimentThreshold: z.union([
    z.coerce.number().min(0).max(100),
    z.literal(""),
  ]),
  keywordDensity: z.union([z.coerce.number().min(0).max(100), z.literal("")]),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const DEFAULTS: SettingsFormValues = {
  quietStart: "09:00",
  quietEnd: "17:00",
  sentimentThreshold: 50,
  keywordDensity: 5,
  dailyEmail: false,
  quietEnabled: false,
};

export default function ModerationSettings() {
  const form = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: DEFAULTS,
  });

  const values = form.watch();

  const onReset = () => {
    form.reset(DEFAULTS);
  };

  const onSave = (data: SettingsFormValues) => {
    // Replace with API call when available
    console.log("Saving moderation settings:", data);
  };

  return (
    <PageLayout title="Moderation Settings">
      <ModerationNav />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">
          <section className="grid grid-cols-1 gap-6 mb-8">
            <div className="p-6 bg-card rounded shadow-sm">
              <h4 className="text-base font-medium mb-1 text-foreground">
                General settings
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Configure general application behavior and notifications.
              </p>

              <div className="w-full border-t border-muted-foreground/40 my-4" />

              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">
                      Daily Moderation Summary Email
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Receive a daily summary of moderation activities via email.
                  </div>
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="dailyEmail"
                    render={({ field }) => (
                      <FormItem>
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
                </div>
              </div>

              <div className="w-full border-t border-muted-foreground/40 my-4" />

              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">
                      Quiet Hours
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Suppress alert pop-ups for new tasks during specified hours.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FormField
                    control={form.control}
                    name="quietStart"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="quietStart"
                            type="time"
                            className="w-28"
                            disabled={!values.quietEnabled}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <span className="text-muted-foreground">-</span>

                  <FormField
                    control={form.control}
                    name="quietEnd"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="quietEnd"
                            type="time"
                            className="w-28"
                            disabled={!values.quietEnabled}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center ml-2">
                    <FormField
                      control={form.control}
                      name="quietEnabled"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={(val) => field.onChange(!!val)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <span className="ml-2 text-sm text-muted-foreground">
                      Enabled
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-card rounded shadow-sm">
              <h4 className="text-base font-medium mb-3 text-foreground">
                Content Flagging Thresholds
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Set criteria for automated content flagging.
              </p>

              <div className="w-full border-t border-muted-foreground/40 mb-4" />

              <div>
                <FormField
                  control={form.control}
                  name="sentimentThreshold"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel>Sentiment Score Threshold</FormLabel>
                        <FormControl>
                          <div className="flex gap-1 items-end">
                            <Input
                              id="sentimentThreshold"
                              type="number"
                              min={0}
                              max={100}
                              className="w-28"
                              {...field}
                              value={field.value as number | string}
                            />
                            <span>%</span>
                          </div>
                        </FormControl>
                      </div>
                      <FormMessage />
                      <FormDescription>
                        Minimum sentiment score (0-100) for content to be
                        automatically flagged. Lower values flag more negative
                        content.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <div className="w-full border-t border-muted-foreground/40 my-4" />
              </div>

              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="keywordDensity"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel>Keyword Density Threshold</FormLabel>
                        <FormControl>
                          <div className="flex gap-1 items-end">
                            <Input
                              id="keywordDensity"
                              type="number"
                              min={0}
                              max={100}
                              className="w-28"
                              {...field}
                              value={field.value as number | string}
                            />
                            <span>%</span>
                          </div>
                        </FormControl>
                      </div>
                      <FormMessage />
                      <FormDescription>
                        Percentage of banned keywords in content for
                        auto-flagging. Higher percentages are stricter.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </section>

          <footer className="flex items-center justify-center gap-4">
            <Button variant="outline" onClick={onReset} type="button">
              Reset to Defaults
            </Button>

            <Button type="submit" className="bg-primary text-white">
              Save changes
            </Button>
          </footer>
        </form>
      </Form>
    </PageLayout>
  );
}
