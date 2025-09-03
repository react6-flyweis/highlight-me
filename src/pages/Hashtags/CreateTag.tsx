import { Link, useNavigate } from "react-router";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/button";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createTagSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum(["general", "tech", "health"]),
  icon: z.string().optional(),
  priority: z.enum(["low", "normal", "high"]),
  description: z.string().optional(),
  visibility: z.enum(["public", "private"]),
});

type CreateTagForm = z.infer<typeof createTagSchema>;

export default function CreateTagPage() {
  const navigate = useNavigate();

  const form = useForm<CreateTagForm>({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      name: "",
      category: "general",
      icon: "",
      priority: "normal",
      description: "",
      visibility: "public",
    },
  });

  async function onSubmit(values: CreateTagForm) {
    // TODO: call API to create tag
    console.log("create tag", values);
    navigate("/hashtags");
  }

  return (
    <PageLayout title="Hashtags & Category > Create new tag" subtitle="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="bg-white border border-gray-100 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Create new tag</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                        placeholder="e.g. photography"
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
                        <SelectTrigger className="mt-2 w-full">
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
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image/Icon Upload</FormLabel>
                    <FormControl>
                      <Input
                        id="icon"
                        placeholder="Image URL or upload"
                        className="mt-2 rounded h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trending Priority</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(val) => field.onChange(val)}
                        value={field.value}
                      >
                        <SelectTrigger className="mt-2 w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
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

              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Visibility</FormLabel>
                    <FormControl>
                      <div className="flex items-start gap-6 mt-2">
                        <RadioGroup
                          value={field.value}
                          onValueChange={(val) => field.onChange(val)}
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="public" />
                            <span className="text-sm">Public</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="private" />
                            <span className="text-sm">Private</span>
                          </div>
                        </RadioGroup>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex justify-center items-center gap-3 mt-5">
              <Link to="/hashtags" className="inline-block">
                <Button
                  size="lg"
                  className="rounded border-primary w-32"
                  variant="outline"
                >
                  Cancel
                </Button>
              </Link>

              <Button size="lg" className="rounded w-32" type="submit">
                Create Hashtag
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </PageLayout>
  );
}
