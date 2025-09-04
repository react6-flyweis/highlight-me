import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
  SelectGroup,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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

const keywordSchema = z.object({
  id: z.string().optional(),
  keyword: z.string().min(1, "Keyword is required"),
  action: z.enum(["Flag", "Auto-Remove", "Block Post"]),
  notes: z.string().optional(),
  status: z.boolean(),
});

type KeywordFormValues = z.infer<typeof keywordSchema>;

interface Props {
  initial?: Partial<KeywordFormValues> & {
    status?: boolean | "active" | "inactive" | undefined;
  };
  onCancel?: () => void;
  onSave?: (payload: {
    id?: string;
    keyword: string;
    action: KeywordFormValues["action"];
    notes?: string;
    status: "active" | "inactive";
  }) => void | Promise<void>;
}

export default function KeywordForm({ initial, onCancel, onSave }: Props) {
  const form = useForm<KeywordFormValues>({
    resolver: zodResolver(keywordSchema),
    defaultValues: {
      id: initial?.id,
      keyword: initial?.keyword ?? "",
      action: (initial?.action as KeywordFormValues["action"]) ?? "Flag",
      notes: initial?.notes ?? "",
      status:
        typeof initial?.status === "string"
          ? initial?.status === "active"
          : Boolean(initial?.status),
    },
  });

  async function handleSubmit(values: KeywordFormValues) {
    const payload = {
      ...values,
      status: values.status ? "active" : "inactive",
    } as {
      id?: string;
      keyword: string;
      action: KeywordFormValues["action"];
      notes?: string;
      status: "active" | "inactive";
    };

    if (onSave) await onSave(payload);
    // leave navigation to consumer
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="keyword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keyword</FormLabel>
                <FormControl>
                  <Input
                    id="keyword"
                    className="mt-2 rounded h-11"
                    placeholder="Keyword to ban"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="action"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Action Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(val) => field.onChange(val)}
                    value={field.value}
                  >
                    <SelectTrigger className="mt-2 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Flag">Flag</SelectItem>
                        <SelectItem value="Auto-Remove">Auto-Remove</SelectItem>
                        <SelectItem value="Block Post">Block Post</SelectItem>
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
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    id="notes"
                    className="mt-2 rounded min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Status</div>
            <div className="flex items-center gap-3">
              <span className="text-sm">
                {form.getValues("status") ? "Enabled" : "Disabled"}
              </span>
              <FormField
                control={form.control}
                name="status"
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

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => onCancel && onCancel()}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
