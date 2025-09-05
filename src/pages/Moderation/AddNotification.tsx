import { PageLayout } from "@/components/layouts/PageLayout";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

const notificationSchema = z.object({
  keyword: z.string().min(1, "Keyword is required"),
  actionType: z.string().optional(),
  status: z.enum(["Active", "Inactive"]).optional(),
  sendPublic: z.boolean().optional(),
  sendPrivate: z.boolean().optional(),
  message: z.string().optional(),
});

type NotificationFormValues = z.infer<typeof notificationSchema>;

const ACTION_TYPES = ["Notify", "Block", "Flag"];

export default function AddNotificationPage() {
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      keyword: "",
      actionType: ACTION_TYPES[0],
      status: "Active",
      sendPublic: true,
      sendPrivate: false,
      message: "",
    },
  });

  const navigate = useNavigate();

  const onCancel = () => {
    form.reset();
    navigate(-1);
  };

  const onSave = (data: NotificationFormValues) => {
    // replace with API call when available
    console.log("Save notification:", data);
    // quick user feedback
    alert("Notification saved (stub)");
    form.reset();
  };

  return (
    <PageLayout title="Ban Keyword Manager > Add New Notification">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSave)}
          className="p-6 bg-card rounded shadow-sm "
        >
          <h4 className="text-base font-medium mb-1 text-foreground">
            Add New Notification
          </h4>
          <p className="text-sm text-muted-foreground mb-6">
            Create a new keyword rule with action type and notification details.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <FormField
              control={form.control}
              name="keyword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keyword</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded h-10 w-4/5"
                      placeholder="Enter keyword"
                      {...field}
                    />
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
                      <SelectTrigger className="w-4/5 rounded h-10!">
                        <SelectValue placeholder="Select action" />
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
          </section>

          <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-col gap-2"
                    >
                      <label className="inline-flex items-center gap-2">
                        <RadioGroupItem value="Active" />
                        <span>Active</span>
                      </label>

                      <label className="inline-flex items-center gap-2">
                        <RadioGroupItem value="Inactive" />
                        <span>Inactive</span>
                      </label>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="md:col-span-3">
              <FormItem>
                <FormLabel>Send Notification To:</FormLabel>
                <FormControl>
                  <div className="flex gap-6 items-center">
                    <FormField
                      control={form.control}
                      name="sendPublic"
                      render={({ field }) => (
                        <label className="inline-flex items-center gap-2">
                          <Checkbox
                            checked={!!field.value}
                            onCheckedChange={(v) => field.onChange(!!v)}
                          />
                          <span>Public</span>
                        </label>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sendPrivate"
                      render={({ field }) => (
                        <label className="inline-flex items-center gap-2">
                          <Checkbox
                            checked={!!field.value}
                            onCheckedChange={(v) => field.onChange(!!v)}
                          />
                          <span>Private</span>
                        </label>
                      )}
                    />
                  </div>
                </FormControl>
                <FormDescription />
              </FormItem>
            </div>
          </section>

          <section className="mb-6">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notification Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter notification text..."
                      className="min-h-28 rounded"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              className="border-primary rounded w-32"
              size="lg"
              onClick={onCancel}
              type="button"
            >
              Cancel
            </Button>

            <Button type="submit" className="rounded w-32" size="lg">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </PageLayout>
  );
}
