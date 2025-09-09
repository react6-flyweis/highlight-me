import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SupportRequestCard } from "@/components/Support/SupportRequestCard";
import type { Ticket } from "@/components/Support/SupportRequestCard";
// icons used inside extracted component
import { PageLayout } from "@/components/layouts/PageLayout";
// no local state required; dialogs live in SupportRequestCard
// dialogs moved into SupportRequestCard

export default function SupportRequestDetailStandalone() {
  const ticket = {
    ticketId: "REQ-2024-00124",
    user: "Alice Johnson",
    email: "alice.johnson@example.com",
    subject: "Unable to Access Account After Password Reset",
    priority: "Medium",
    status: "Open",
    assignedTo: "Support Agent",
    createdDate: "July 28, 2024",
    updatedDate: "July 29, 2024, 03:00 PM",
    time: "09:15 AM",
    description:
      "I am writing to report an issue I'm facing with my account. I recently reset my password, but I'm still unable to log in. I've tried multiple times, ensuring I'm using the correct, new password. The system either tells me the password is incorrect or that my account is locked. Could you please assist me with this? My registered email is alice.johnson@example.com.",
    attachments: [{ name: "Invoice_JUL_2024.pdf", size: "234 KB" }],
    reference: "KB-0056 (Password Reset Guide)",
  };

  // dialogs and their state are handled inside SupportRequestCard

  return (
    <PageLayout title={`Support Ticket #${ticket.ticketId}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SupportRequestCard ticket={ticket as Ticket} />
        </div>

        <aside className="space-y-6">
          <div className="bg-white rounded p-4 border shadow flex flex-col items-center text-center">
            <Avatar className="mb-2">
              {
                <AvatarImage
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt={ticket.user}
                  className="object-cover opacity-60"
                />
              }
              <AvatarFallback>
                {ticket.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="font-semibold">{ticket.user}</div>
            <div className="text-sm text-muted-foreground">{ticket.email}</div>

            <div className="mt-3">
              <Badge className="px-3 py-1 bg-gray-300 text-foreground">
                Premium User
              </Badge>
            </div>

            {/* <div className="mt-3 text-sm">
              <div className="text-muted-foreground">Assigned to</div>
              <div className="font-medium">{assignedTo ?? "Unassigned"}</div>
            </div> */}
            <Button variant="outline" size="sm" className="mt-4 w-full">
              View Full Profile
            </Button>
          </div>

          <div className="space-y-2 p-4 bg-white rounded border shadow">
            <h4 className="font-semibold text-gray-800 mb-4">
              Related Tickets
            </h4>
            <ul className="space-y-3  text-gray-700">
              <li>ID: REQ-2024-00123</li>
              <li>ID: REQ-2024-00087</li>
              <li>ID: REQ-2024-00123</li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Additional sections below: Communication History and Internal Notes */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="rounded">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Communication History
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                <div className="">
                  <div className="mb-2 font-semibold">You (System)</div>
                  <div className="text-sm text-muted-foreground">
                    Sent automated password reset confirmation. (2024-07-28
                    09:15 AM)
                  </div>
                </div>

                <div className="text-sm">
                  <div className="font-medium">Alice Johnson</div>
                  <div className="text-muted-foreground">
                    "I tried resetting, but it's not working. Still locked out."
                    (2024-07-28 10:05 AM)
                  </div>
                </div>

                <div className="text-sm">
                  <div className="font-medium">Agent Smith</div>
                  <div className="text-muted-foreground">
                    "Acknowledged issue, initiating account unlock procedure.
                    Please try again in 5 minutes." (2024-07-28 10:10 AM)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-5 flex items-center justify-end gap-3">
            <Button className="rounded">+ Add New FAQ Category</Button>
            <Button variant="outline" className="rounded">
              Common Actions Modals
            </Button>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-white rounded p-4 border shadow">
            <h4 className="font-semibold mb-2 text-gray-800">Internal Notes</h4>

            <div className="text-sm text-muted-foreground h-15 p-2 border rounded">
              ID: REQ-2024-00123
            </div>

            <div className="my-4 flex justify-center">
              <Button className="rounded w-44">Add Note</Button>
            </div>

            <div className="space-y-3">
              <div className="p-3 border rounded text-sm">
                Customer is frustrated with recurring billing problem. Escalated
                to billing team. Awaiting response. — Agent Smith, 2024-07-29
                10:30 AM
              </div>
              <div className="p-3 border rounded text-sm">
                Customer is frustrated with recurring billing problem. Escalated
                to billing team. Awaiting response. — Agent Smith, 2024-07-29
                10:30 AM
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* dialogs handled inside SupportRequestCard */}
    </PageLayout>
  );
}
