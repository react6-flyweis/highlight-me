import { useNavigate } from "react-router";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Trash2Icon } from "lucide-react";

const rowSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  username: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  prizeTier: z.enum(["gold", "silver", "bronze"]),
  status: z.enum(["pending", "shipped", "delivered"]),
});

const uploadSchema = z.object({
  contest: z.string(),
  prizeTier: z.enum(["gold", "silver", "bronze"]),
  rows: z.array(rowSchema).min(1, "At least one winner is required"),
  shippingAddress: z.string().optional(),
  contactNumber: z.string().optional(),
  file: z.any().optional(),
});

type UploadFormValues = z.infer<typeof uploadSchema>;

export default function UploadWinnerPage() {
  const navigate = useNavigate();

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      contest: "summer-2024",
      prizeTier: "gold",
      rows: [
        {
          id: "r1",
          name: "",
          username: "",
          email: "",
          prizeTier: "gold",
          status: "pending",
        },
      ],
      shippingAddress: "",
      contactNumber: "",
      file: undefined,
    },
  });

  const { control, register, setValue, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "rows" });

  function addRow() {
    append({
      id: `r${Date.now()}`,
      name: "",
      username: "",
      email: "",
      prizeTier: "gold",
      status: "pending",
    });
  }

  function onSubmit(values: UploadFormValues) {
    // Forward validated payload to the confirmation route so it can be reviewed.
    // File will be a File object if provided; we pass it through route state.
    navigate("/contests/upload-confirmation", { state: values });
  }

  return (
    <PageLayout title="Upload Winner">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="p-4 gap-2 rounded">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FormField
                  control={control}
                  name="contest"
                  render={({ field: f }) => (
                    <FormItem>
                      <FormLabel>Select Contest</FormLabel>
                      <FormControl>
                        <Select onValueChange={f.onChange} value={f.value}>
                          <SelectTrigger className="w-full h-11 rounded">
                            <SelectValue placeholder="Select contest" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="summer-2024">
                              Summer Sale 2024 (2024-07-15)
                            </SelectItem>
                            <SelectItem value="weekly-1">
                              Weekly Contest (2025-08-08)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={control}
                  name="prizeTier"
                  render={({ field: f }) => (
                    <FormItem>
                      <FormLabel>Prize Tier</FormLabel>
                      <FormControl>
                        <Select onValueChange={f.onChange} value={f.value}>
                          <SelectTrigger className="w-full h-11 rounded">
                            <SelectValue placeholder="Select prize tier" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gold">
                              Grand Prize (Gold)
                            </SelectItem>
                            <SelectItem value="silver">Silver</SelectItem>
                            <SelectItem value="bronze">Bronze</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>

          <Card className="p-4 mt-4 gap-2 rounded">
            <h3 className="text-lg font-semibold">Winner Details</h3>
            <div className="text-sm text-muted-foreground mb-4">
              Enter winner information manually or import via CSV.
            </div>

            <Table className="border border-border rounded-md">
              <TableHeader>
                <TableRow>
                  <TableHead className="p-3">Winner Name</TableHead>
                  <TableHead className="p-3">Username/ID</TableHead>
                  <TableHead className="p-3">Email</TableHead>
                  <TableHead className="p-3">Prize Tier</TableHead>
                  <TableHead className="p-3">Status</TableHead>
                  <TableHead className="p-3 text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow key={field.id} className="align-top">
                    <TableCell className="p-2">
                      <FormField
                        control={control}
                        name={`rows.${index}.name` as const}
                        render={({ field: f }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-full"
                                placeholder="Full Name"
                                {...f}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>

                    <TableCell className="p-2">
                      <Controller
                        control={control}
                        name={`rows.${index}.username` as const}
                        render={({ field: f }) => (
                          <Select
                            value={f.value}
                            onValueChange={(v) => f.onChange(v)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select user" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user_123">user_123</SelectItem>
                              <SelectItem value="user_456">user_456</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </TableCell>

                    <TableCell className="p-2">
                      <FormField
                        control={control}
                        name={`rows.${index}.email` as const}
                        render={({ field: f }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-full"
                                placeholder="Email"
                                {...f}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>

                    <TableCell className="p-2">
                      <Controller
                        control={control}
                        name={`rows.${index}.prizeTier` as const}
                        render={({ field: f }) => (
                          <Select
                            value={f.value}
                            onValueChange={(v) => f.onChange(v)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="gold">Gold</SelectItem>
                              <SelectItem value="silver">Silver</SelectItem>
                              <SelectItem value="bronze">Bronze</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </TableCell>

                    <TableCell className="p-2">
                      <Controller
                        control={control}
                        name={`rows.${index}.status` as const}
                        render={({ field: f }) => (
                          <Select
                            value={f.value}
                            onValueChange={(v) => f.onChange(v)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">
                                Delivered
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </TableCell>

                    <TableCell className="p-2 text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Trash2Icon className="size-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell colSpan={6} className="p-2">
                    <Button
                      type="button"
                      className="w-full h-11 rounded"
                      onClick={addRow}
                    >
                      Add New row
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="mt-6">
              <h4 className="text-lg font-medium mb-3">Bulk Upload</h4>

              <label
                htmlFor="csv-upload"
                className="w-full flex flex-col items-center justify-center gap-2 cursor-pointer border border-dashed rounded p-6 text-center"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const f = e.dataTransfer?.files && e.dataTransfer.files[0];
                  if (f) setValue("file", f);
                }}
              >
                <Input
                  id="csv-upload"
                  type="file"
                  accept=".csv,text/csv"
                  className="sr-only"
                  onChange={(e) =>
                    setValue(
                      "file",
                      e.target.files ? e.target.files[0] : undefined
                    )
                  }
                />

                <div className="text-sm text-muted-foreground">
                  Drag and drop your CSV file here, or click to browse
                </div>
                <div className="text-xs text-muted-foreground">
                  Max file size: 10MB
                </div>

                <div className="text-sm text-muted-foreground">
                  {/* show file name if present */}
                  {form.getValues("file") ? (
                    <span className="font-medium">
                      {(form.getValues("file") as File).name}
                    </span>
                  ) : (
                    <span>No file selected</span>
                  )}
                </div>
              </label>

              <div className="mt-3 text-xs text-muted-foreground">
                Having trouble?{" "}
                <a
                  href="#"
                  className="text-teal-600 hover:underline"
                  onClick={(e) => e.preventDefault()}
                >
                  Download sample CSV template
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-medium">Shipping Details</h4>
              <p className="text-muted-foreground mb-3">
                Required for physical prizes.
              </p>
              <div className="grid grid-cols-1 gap-3">
                <Label>Shipping Address</Label>
                <Input
                  className="w-full rounded h-11"
                  placeholder="Enter full shipping address"
                  {...register("shippingAddress")}
                />

                <Label>Contact Number</Label>
                <Input
                  className="w-full rounded h-11"
                  placeholder="e.g., +1234567890"
                  {...register("contactNumber")}
                />
              </div>

              <div className="flex items-center gap-3 justify-center mt-6">
                <Button
                  type="button"
                  className="rounded h-11 border-primary min-w-32"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="rounded h-11 border-primary min-w-32"
                  variant="outline"
                >
                  Save as Draft
                </Button>
                <Button type="submit" className="rounded h-11 min-w-32">
                  Upload Winner(s)
                </Button>
              </div>
            </div>
          </Card>
        </form>
      </Form>
    </PageLayout>
  );
}
