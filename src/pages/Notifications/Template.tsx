import { PageLayout } from "@/components/layouts/PageLayout";
import { NotificationsNav } from "@/components/layouts/NotificationsNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, EditIcon, Trash2 } from "lucide-react";

const builtInTemplates = [
  {
    id: 1,
    title: "Welcome Onboard Notification",
    description:
      "Your journey with Notification Hub starts now! Get ready to explore powerful features designed to streamline your communication and engage your audience effectively. We are thrilled to have you join our community.",
  },
  {
    id: 2,
    title: "Promotional Offer Reminder",
    description:
      "Limited time offer ending soon! Don't miss out on amazing savings on our premium subscription. Upgrade today to unlock exclusive features and take your notifications strategy to the next level. Act fast!",
  },
  {
    id: 3,
    title: "New Feature Announcement",
    description:
      "Exciting news! We've just rolled out a new feature designed to enhance your experience: Audience Segmentation. Now target your notifications with unparalleled precision. Explore it in the Audience Management section.",
  },
];

const customTemplates = [
  {
    id: 101,
    title: "Flash Sale Alert",
    description:
      "Get ready for our exclusive flash sale! Huge discounts on selected items for 24 hours only. Don't miss this opportunity to grab your favorites at unbeatable prices. Shop now before it's too late!",
  },
  {
    id: 102,
    title: "Event Reminder: Webinar",
    description:
      "Get ready for our exclusive flash sale! Huge discounts on selected items for 24 hours only. Don't miss this opportunity to grab your favorites at unbeatable prices. Shop now before it's too late!",
  },
  {
    id: 103,
    title: "Feedback Request",
    description:
      "We value your opinion! Please take a moment to share your feedback on your recent experience with Notification Hub. Your insights help us improve and tailor our services to better meet your needs.",
  },
  {
    id: 104,
    title: "Order Confirmation: Thank You",
    description:
      "Thank you for your recent purchase! Your order #NTHB-2024-5678 has been confirmed and will be shipped shortly. You will receive another notification with tracking details once your order is on its way.",
  },
];

export default function TemplatePage() {
  return (
    <PageLayout title="Notifications">
      <NotificationsNav />

      <div className="flex justify-end gap-2 mb-6">
        <Button size="sm">+ Create New Template</Button>
        <Button
          size="sm"
          variant="outline"
          className="border-primary text-primary"
        >
          + New Notification
        </Button>
      </div>

      <div className="space-y-6 p-5 bg-white rounded border shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800">
          Notification Templates
        </h2>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">
            Built-in Templates
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {builtInTemplates.map((template) => (
              <Card key={template.id} className="border rounded-md">
                <CardHeader className="">
                  <CardTitle className="text-base font-semibold text-gray-800">
                    {template.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {template.description}
                  </p>
                  <Button size="sm" className="w-32">
                    <EyeIcon />
                    Use
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <h3 className="text-lg font-medium text-gray-700">
            Your Custom Templates
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
            {customTemplates.map((t) => (
              <Card key={t.id} className="border rounded-md">
                <CardContent>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {t.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {t.description}
                  </p>

                  <div className="flex flex-wrap gap-2 items-center">
                    <Button size="sm" className="bg-teal-600 text-white">
                      <EyeIcon /> Use
                    </Button>

                    <Button size="sm" variant="outline" className="">
                      <EditIcon /> Edit
                    </Button>

                    <Button size="sm" variant="outline" className="">
                      Clone
                    </Button>

                    <Button size="sm" className="bg-red-600 text-white ml-2">
                      <Trash2 /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
