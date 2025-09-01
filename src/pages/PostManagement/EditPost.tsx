import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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

const postSchema = z.object({
  title: z.string().min(2, "Title is required"),
  summary: z.string().optional(),
  content: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]),
  category: z.enum(["technology", "design", "business"]),
});

type PostForm = z.infer<typeof postSchema>;

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const form = useForm<PostForm>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      status: "draft",
      category: "technology",
    },
  });

  useEffect(() => {
    // mock initial data (replace with real fetch)
    const mock: PostForm = {
      title: "The Future of AI in Creative Design",
      summary:
        "Explore how artificial intelligence is transforming creative industries, from automating mundane tasks to inspiring innovative design solutions.",
      content:
        "In the dynamic landscape of digital content, effective post management is crucial for maintaining a vibrant and engaging online presence.",
      status: "draft",
      category: "technology",
    };

    form.reset(mock);
  }, [id, form]);

  async function onSubmit(values: PostForm) {
    console.log("save", { id, ...values });
    navigate("/posts");
  }

  return (
    <PageLayout title="Edit Post">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="bg-white rounded p-4 border">
            <h3 className="text-sm font-medium mb-4">Post Details</h3>

            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Title</FormLabel>
                    <FormControl>
                      <Input
                        id="title"
                        className="rounded h-11"
                        placeholder="Post title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Summary</FormLabel>
                    <FormControl>
                      <Textarea id="summary" className="rounded" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="bg-white rounded p-4 border">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Content</FormLabel>
                  <FormControl>
                    <Textarea
                      id="content"
                      className="h-48 rounded"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="bg-white rounded p-4 border">
            <h3 className="text-sm font-medium mb-4">Post Content</h3>

            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(val) => field.onChange(val)}
                        value={field.value}
                      >
                        <SelectTrigger
                          size="sm"
                          className="w-full mt-1 rounded h-11!"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(val) => field.onChange(val)}
                        value={field.value}
                      >
                        <SelectTrigger
                          size="sm"
                          className="w-full h-11! mt-1 rounded"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* 
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => navigate(-1)} disabled={form.formState.isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  Save
                </Button>
              </div> */}
          </div>
        </form>
      </Form>
    </PageLayout>
  );
}
