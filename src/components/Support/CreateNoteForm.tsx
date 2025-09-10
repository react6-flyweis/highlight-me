import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AttachDialog } from "@/components/Support/AttachDialog";
import { PaperclipIcon } from "lucide-react";

const createNoteSchema = z.object({
  body: z.string().min(1, "Note body is required"),
});

type CreateNoteValues = z.infer<typeof createNoteSchema>;

export type CreateNoteFormProps = {
  defaultBody?: string;
};

export function CreateNoteForm({ defaultBody = "" }: CreateNoteFormProps) {
  const [attachments, setAttachments] = useState<File[]>([]);
  const form = useForm<CreateNoteValues>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: { body: defaultBody },
  });

  async function handleSubmit(values: CreateNoteValues) {
    // TODO: replace with API call that includes `values` and `attachments`
    console.log("Save note", { values, attachments });
    form.reset({ body: "" });
    setAttachments([]);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col h-full"
      >
        <div className="p-5 bg-white rounded border h-full flex-1 flex flex-col">
          <h3 className="text-lg font-medium mb-3">Create New Note</h3>

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    id="noteBody"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Start typing your note here... This supports rich text formatting but is simulated as a plain text area for this static view."
                    className="w-full resize-none bg-white p-3 border rounded h-28 text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* action buttons (kept visually outside the card) */}
        <div className="flex justify-between mt-4">
          <div className="mt-0 flex items-center gap-2">
            <AttachDialog
              trigger={
                <Button
                  variant="outline"
                  className="rounded flex items-center gap-2 w-40"
                >
                  <PaperclipIcon />
                  Attach
                  {attachments && attachments.length > 0
                    ? ` (${attachments.length})`
                    : ""}
                </Button>
              }
              onAttach={(files: File[]) => setAttachments(files)}
            />
          </div>

          <div className="mt-0 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                form.reset({ body: "" });
                setAttachments([]);
              }}
              className="rounded border-primary text-primary w-32"
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded  w-32">
              Save Note
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
