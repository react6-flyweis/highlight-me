import { Link, useNavigate, useParams } from "react-router";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useEffect } from "react";
import { Switch } from "@/components/ui/switch";

const editTagSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum(["general", "tech", "health"]),
  icon: z.string().optional(),
  priority: z.enum(["low", "normal", "high"]),
  description: z.string().optional(),
  visibility: z.enum(["public", "private"]),
  status: z.enum(["active", "inactive"]),
});

type EditTagForm = z.infer<typeof editTagSchema>;

export default function EditTagPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // mock fetch - in a real app replace with API call
  const tag = {
    id: id ?? "1",
    name: "#SocialMediaMarketing",
    category: "general",
    description:
      "The official hashtag for discussions, trends, and strategies related to social media marketing across various platforms and campaigns.",
    icon: "",
    priority: "normal",
    visibility: "public",
    status: "active",
  };

  const form = useForm<EditTagForm>({
    resolver: zodResolver(editTagSchema),
    defaultValues: {
      name: "",
      category: "general",
      icon: "",
      priority: "normal",
      description: "",
      visibility: "public",
      status: "active",
    },
  });

  useEffect(() => {
    // populate form with fetched tag
    form.reset({
      name: tag.name,
      category: tag.category as EditTagForm["category"],
      icon: tag.icon,
      priority: tag.priority as EditTagForm["priority"],
      description: tag.description,
      visibility: (tag.visibility as EditTagForm["visibility"]) ?? "public",
      status: (tag.status as EditTagForm["status"]) ?? "active",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function onSubmit(values: EditTagForm) {
    // TODO: call API to update tag
    console.log("update tag", id, values);
    navigate("/hashtags/management");
  }

  return (
    <PageLayout title="Hashtag Management > Edit" subtitle="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Card 1 - Basic Hashtag Details */}
          <div className="bg-white border  rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Basic Hashtag Details</h2>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hashtag Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        className="mt-2 rounded h-11"
                        placeholder="#innovationwave"
                        {...field}
                      />
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
                        <SelectTrigger className="mt-2 rounded h-11! w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="tech">Technology</SelectItem>
                          <SelectItem value="health">Health</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        id="description"
                        className="mt-2 rounded"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Card 2 - Advanced Settings */}
          <div className="bg-white border  rounded-lg p-6 mb-6">
            <h3 className="text-base font-medium mb-3">Advanced Settings</h3>

            <div>
              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Visibility</FormLabel>
                    <FormControl>
                      <div className="mt-2">
                        <Switch
                          checked={field.value === "public"}
                          onCheckedChange={(checked) =>
                            field.onChange(checked ? "public" : "private")
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-10">
                    <FormLabel>Trend Priority</FormLabel>
                    <FormControl>
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          variant={
                            field.value === "low" ? "default" : "outline"
                          }
                          className="rounded w-32 flex-1"
                          type="button"
                          onClick={() => field.onChange("low")}
                        >
                          Low
                        </Button>

                        <Button
                          variant={
                            field.value === "normal" ? "default" : "outline"
                          }
                          className="rounded w-32 flex-1"
                          type="button"
                          onClick={() => field.onChange("normal")}
                        >
                          Medium
                        </Button>

                        <Button
                          variant={
                            field.value === "high" ? "default" : "outline"
                          }
                          className="rounded w-32 flex-1"
                          type="button"
                          onClick={() => field.onChange("high")}
                        >
                          High
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(val) => field.onChange(val)}
                        value={field.value}
                      >
                        <SelectTrigger className="mt-2 w-full rounded h-11!">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Card 3 - Feature Image / Upload area */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-base font-medium mb-3">Feature Image / Icon</h3>
            <div className="border border-dashed border-gray-200 rounded p-6 text-center">
              <div className="mb-4">
                <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-gray-500">
                Drag & drop an image or click to upload
              </p>
              <div className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="inline-block px-4 py-2 rounded w-32 text-sm bg-white text-primary border-primary"
                >
                  Browse Files
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-3 mt-5">
            <Link to="/hashtags/management" className="inline-block">
              <Button
                size="lg"
                className="rounded border-primary w-32"
                variant="outline"
              >
                Cancel
              </Button>
            </Link>

            <Button size="lg" className="rounded w-32" type="submit">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </PageLayout>
  );
}
