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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
  onConfirm: (values: {
    subject: string;
    message: string;
    sendAs: "in_app" | "email";
  }) => void;
};

const schema = z.object({
  subject: z.string().min(1, "Enter subject"),
  message: z.string().min(1, "Enter message"),
  sendAs: z.enum(["in_app", "email"]),
});

export function SendWarningDialog({
  open,
  onOpenChange,
  userName,
  onConfirm,
}: Props) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { subject: "", message: "", sendAs: "in_app" },
  });

  const submit = (vals: z.infer<typeof schema>) => {
    onConfirm(vals);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Send Warning</DialogTitle>
          <DialogDescription>
            Send a warning to {userName ?? "this user"} via in-app notification
            or email.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="grid gap-4 pt-2"
          >
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message box</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[8rem]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel className="mb-2 block">Send as</FormLabel>
              <FormField
                control={form.control}
                name="sendAs"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-3">
                        <RadioGroupItem value="in_app" />
                        <span>In-app notification</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <RadioGroupItem value="email" />
                        <span>Email</span>
                      </label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>

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
                Send Warning
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default SendWarningDialog;
