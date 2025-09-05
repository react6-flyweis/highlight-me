import RichTextEditor from "@/components/ui/RichTextEditor";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessagePreview } from "@/components/Settings/MessagePreview";

const messageSchema = z.object({
  name: z.string().min(1, "Message name is required"),
  language: z.string().min(1, "Language is required"),
  active: z.boolean(),
  content: z.string().min(1, "Message content is required"),
  updatedBy: z.string().optional(),
  updatedAt: z.string().optional(),
});

type MessageFormValues = z.infer<typeof messageSchema>;

const DEFAULTS: MessageFormValues = {
  name: "Maintenance Advisory",
  language: "en",
  active: true,
  content:
    "We're currently undergoing scheduled maintenance to improve our services. Posting will resume shortly. We apologize for any inconvenience.",
  updatedBy: "Admin User",
  updatedAt: new Date().toLocaleString(),
};

export default function CustomMessages() {
  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: DEFAULTS,
  });

  const values = form.watch();

  // function onReset() {
  //   form.reset(DEFAULTS);
  // }

  function onSave(data: MessageFormValues) {
    // TODO: send to API
    console.log("Saving custom message:", data);
  }

  return (
    <PageLayout title="Custom Messages">
      <AppSettingsNav />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">
          <section className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
            <div className="p-6 bg-card rounded shadow-sm">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-medium mb-1 text-foreground">
                  Message editor
                </h4>
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="sr-only">Language</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(val) => field.onChange(val)}
                          value={field.value}
                        >
                          <SelectTrigger className="w-40 h-10 rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4 space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Message name</FormLabel>
                      <FormControl>
                        <Input id="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Message content</FormLabel>
                      <FormControl>
                        <div className="min-h-[8rem]">
                          <RichTextEditor
                            value={field.value}
                            onChange={(val: string) => field.onChange(val)}
                            className="min-h-[8rem]"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormControl>
                        <Switch
                          checked={!!field.value}
                          onCheckedChange={(val) => field.onChange(!!val)}
                        />
                      </FormControl>
                      <FormLabel className="">Message is Active</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Preview Column */}
            <MessagePreview
              content={values.content}
              language={values.language}
              active={!!values.active}
              updatedBy={values.updatedBy}
              updatedAt={values.updatedAt}
            />
          </section>
        </form>
      </Form>
    </PageLayout>
  );
}
