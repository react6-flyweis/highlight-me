import { PageLayout } from "@/components/layouts/PageLayout";
import { ContestsNav } from "@/components/Contests/ContestsNav";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const formSchema = z.object({
  prizeName: z.string().min(1, "Prize name is required"),
  prizeDescription: z.string().min(1, "Prize description is required"),
  criteriaField: z.string().optional(),
  prizeTier: z.string().optional(),
  deliveryType: z.enum(["physical", "digital"]),
  estimatedDeliveryTime: z.string().optional(),
});

export default function PrizeDetailsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prizeName: "",
      prizeDescription: "",
      criteriaField: undefined,
      prizeTier: undefined,
      deliveryType: "physical",
      estimatedDeliveryTime: "",
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // For now just log the values. In a real app you'd send them to an API.
    console.log(values, { imagePreview });
  }

  return (
    <PageLayout title="Contests & Prizes Management">
      <ContestsNav />

      <h3 className="text-xl font-semibold">Prize Detail Management</h3>
      <div className="text-muted-foreground mt-1 mb-4">
        Enter or update the details for your prize.
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="rounded">
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="prizeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prize Name</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11 bg-[#F7F0F0] rounded"
                        placeholder="Exclusive VIP Event Pass"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A clear, concise name for the prize.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prizeDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prize Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-32 bg-[#F7F0F0] rounded"
                        placeholder="Access to an exclusive online VIP event with special guest speakers and networking opportunities. Includes a digital goodie bag with premium content."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Detailed information about the prize, visible to
                      participants.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Prize Image</FormLabel>
                <div className="border border-dashed rounded p-4 bg-[#F7F0F0]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const url = URL.createObjectURL(file);
                      setImagePreview(url);
                    }}
                  />
                  {imagePreview && (
                    <div className="mt-3">
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="max-h-48 mx-auto object-contain"
                      />
                    </div>
                  )}
                </div>
                <FormDescription>
                  load an image that represents your prize. (Max 5MB)
                </FormDescription>
              </FormItem>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="criteriaField"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Criteria fields</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="h-12 rounded w-full">
                            <SelectValue placeholder="Select criteria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="engagement">
                              engagement
                            </SelectItem>
                            <SelectItem value="referrals">referrals</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="prizeTier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prize Tiers</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="h-12 rounded w-full">
                            <SelectValue placeholder="Select tier" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tier1">Tier 1</SelectItem>
                            <SelectItem value="tier2">Tier 2</SelectItem>
                            <SelectItem value="tier3">Tier 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="deliveryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col gap-2"
                      >
                        <label className="flex items-center gap-2">
                          <RadioGroupItem value="physical" />
                          <span>Physical Shipment</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <RadioGroupItem value="digital" />
                          <span>Digital Reward</span>
                        </label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estimatedDeliveryTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Delivery Time</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded h-11 md:w-1/2"
                        placeholder="Optional"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-center gap-6">
            <Button
              className="w-44 rounded border-2 border-primary"
              size="lg"
              variant="outline"
            >
              Cancel
            </Button>
            <Button className="w-44 rounded" size="lg" type="submit">
              Save Prize
            </Button>
          </div>
        </form>
      </Form>
    </PageLayout>
  );
}
