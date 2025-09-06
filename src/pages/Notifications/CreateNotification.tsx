import { PageLayout } from "@/components/layouts/PageLayout";
import { NotificationsNav } from "@/components/layouts/NotificationsNav";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { useNavigate } from "react-router";

const createNotificationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().optional(),
  type: z.enum(["push", "inapp"]),
  targetAudience: z.string().optional(),
  platformMobile: z.boolean().optional(),
  platformWeb: z.boolean().optional(),
  platformBoth: z.boolean().optional(),
  scheduledDate: z.string().optional(),
  scheduledTime: z.string().optional(),
});

type CreateNotificationForm = z.infer<typeof createNotificationSchema>;

export default function CreateNotificationPage() {
  const navigate = useNavigate();

  const form = useForm<CreateNotificationForm>({
    resolver: zodResolver(createNotificationSchema),
    defaultValues: {
      title: "",
      body: "",
      type: "push",
      targetAudience: "Admin",
      platformMobile: true,
      platformWeb: false,
      platformBoth: false,
      scheduledDate: "",
      scheduledTime: "",
    },
  });

  //   function onCancel() {
  //     form.reset();
  //     navigate(-1);
  //   }

  function onSubmit(values: CreateNotificationForm) {
    // TODO: wire up API call
    console.log("Create notification:", values);
    // give quick feedback and navigate back to notifications list
    alert("Notification created (stub)");
    navigate("/notifications/all");
  }

  return (
    <PageLayout title="Notifications">
      <NotificationsNav />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
          <div className="bg-white border rounded-lg p-6 mb-6">
            <div className="mb-6 border-b pb-3">
              <h2 className="text-2xl font-medium">Create New Notification</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Define the prize tiers based on active user engagement. Each
                tier specifies a user count range and associated rewards.
              </p>
            </div>

            <h3 className="text-lg font-medium mb-4">Message Details</h3>

            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notification Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Your order has shipped!"
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
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notification Body</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your detailed message here..."
                        className="rounded"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Notification Type</FormLabel>
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex gap-6"
                        >
                          <label className="inline-flex items-center gap-2">
                            <RadioGroupItem value="push" />
                            <span>Push Notification</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <RadioGroupItem value="inapp" />
                            <span>In-App Message</span>
                          </label>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <hr className="my-6 border-t" />

            <h3 className="text-lg font-medium mb-4">Targeting</h3>

            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="mt-2 rounded h-11! w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="All Users">All Users</SelectItem>
                          <SelectItem value="Beta Testers">
                            Beta Testers
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Platform Target</FormLabel>
                <FormDescription />
                <div className="mt-2 flex gap-6 items-center">
                  <FormField
                    control={form.control}
                    name="platformMobile"
                    render={({ field }) => (
                      <label className="inline-flex items-center gap-2">
                        <Checkbox
                          checked={!!field.value}
                          onCheckedChange={(v) => field.onChange(!!v)}
                        />
                        <span>Mobile App</span>
                      </label>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="platformWeb"
                    render={({ field }) => (
                      <label className="inline-flex items-center gap-2">
                        <Checkbox
                          checked={!!field.value}
                          onCheckedChange={(v) => field.onChange(!!v)}
                        />
                        <span>Web Browser</span>
                      </label>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="platformBoth"
                    render={({ field }) => (
                      <label className="inline-flex items-center gap-2">
                        <Checkbox
                          checked={!!field.value}
                          onCheckedChange={(v) => field.onChange(!!v)}
                        />
                        <span>Both (Mobile & Web)</span>
                      </label>
                    )}
                  />
                </div>
              </FormItem>
            </div>

            <hr className="my-6 border-t" />

            <h3 className="text-lg font-medium mb-4">Scheduling</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="scheduledDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scheduled Date</FormLabel>
                    <FormControl>
                      <Input type="date" className="mt-2 rounded" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scheduledTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scheduled Time</FormLabel>
                    <FormControl>
                      <Input type="time" className="mt-2 rounded" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <hr className="mt-6" />

            <div className="flex items-center justify-center gap-4 mt-6">
              <Button variant="ghost" className="text-primary" type="button">
                Save as Draft
              </Button>

              <Button
                variant="outline"
                className="text-primary border-primary rounded w-36"
                type="button"
              >
                Schedule later
              </Button>

              <Button className="rounded w-36" type="submit">
                Send Now
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </PageLayout>
  );
}
