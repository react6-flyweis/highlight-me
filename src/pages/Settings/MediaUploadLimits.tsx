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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const mediaSchema = z.object({
  maxPhotoMb: z
    .number()
    .min(1, "Must be at least 1 MB")
    .max(1024 * 10, "Too large"),
  maxVideoMb: z
    .number()
    .min(1, "Must be at least 1 MB")
    .max(1024 * 50, "Too large"),
  maxVideoSec: z
    .number()
    .min(1, "Must be at least 1 second")
    .max(60 * 60 * 2, "Too long"),
  allowMultiple: z.boolean(),
  allowGif: z.boolean(),
  errorMessage: z.string().optional(),
});

type MediaFormValues = z.infer<typeof mediaSchema>;

const DEFAULTS: MediaFormValues = {
  maxPhotoMb: 25,
  maxVideoMb: 25,
  maxVideoSec: 25,
  allowMultiple: true,
  allowGif: true,
  errorMessage:
    "File upload failed: Maximum size exceeded. Please upload a file smaller than 25MB.",
};

export default function MediaUploadLimits() {
  const form = useForm<MediaFormValues>({
    resolver: zodResolver(mediaSchema),
    defaultValues: DEFAULTS,
  });

  const values = form.watch();

  const preview = useMemo(() => {
    return values.errorMessage || "";
  }, [values.errorMessage]);

  function onReset() {
    form.reset(DEFAULTS);
  }

  function onSave(data: MediaFormValues) {
    // TODO: persist to API
    console.log("Saving media upload limits:", data);
  }

  return (
    <PageLayout title="Media Upload Limits">
      <AppSettingsNav />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">
          <section className="grid grid-cols-1 gap-6 mb-8">
            <div className="p-6 bg-card rounded shadow-sm">
              <h4 className="text-base font-medium mb-1 text-foreground">
                File Size Limits
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Set maximum allowed sizes for photo and video uploads.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="maxPhotoMb"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Photo File Size (MB)</FormLabel>
                      <FormControl>
                        <Input
                          id="maxPhotoMb"
                          type="number"
                          min={1}
                          className="rounded"
                          {...field}
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxVideoMb"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Video File Size (MB)</FormLabel>
                      <FormControl>
                        <Input
                          id="maxVideoMb"
                          type="number"
                          min={1}
                          className="rounded"
                          {...field}
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="p-6 bg-card rounded shadow-sm">
              <h4 className="text-base font-medium mb-1 text-foreground">
                Video Duration Limit
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Specify the maximum duration for video uploads.
              </p>

              <FormField
                control={form.control}
                name="maxVideoSec"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Video Duration (seconds)</FormLabel>
                    <FormControl>
                      <Input
                        id="maxVideoSec"
                        type="number"
                        min={1}
                        className="w-full rounded"
                        {...field}
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="p-6 bg-card rounded shadow-sm">
              <h4 className="text-base font-medium mb-1 text-foreground">
                Upload Options
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Configure additional media upload behaviors.
              </p>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="allowMultiple"
                  render={({ field }) => (
                    <FormItem className="flex justify-between items-center">
                      <FormLabel>Allow Multiple Uploads</FormLabel>
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

                <FormField
                  control={form.control}
                  name="allowGif"
                  render={({ field }) => (
                    <FormItem className="flex justify-between items-center">
                      <FormLabel>Allow GIF Uploads</FormLabel>
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

            <div className="p-6 bg-card rounded shadow-sm">
              <h4 className="text-base font-medium mb-3 text-foreground">
                Error Message Preview
              </h4>

              <FormField
                control={form.control}
                name="errorMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        id="errorMessage"
                        className="min-h-[5rem]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4 p-3 rounded border bg-muted text-sm text-muted-foreground">
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
