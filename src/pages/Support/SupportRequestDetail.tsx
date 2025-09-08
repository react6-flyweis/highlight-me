import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { PageLayout } from "@/components/layouts/PageLayout";
import { MailIcon, MessageCircleIcon } from "lucide-react";

export default function SupportRequestDetail() {
  const [reply, setReply] = useState("");
  const [assignee, setAssignee] = useState<string | undefined>(undefined);

  return (
    <PageLayout title="Detailed Feedback / Support Request View">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="md:col-span-2">
          <div className="p-5 bg-white rounded shadow">
            <div className="flex items-center gap-2">
              <div className="flex shrink-0">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
                      alt="avatar"
                    />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-semibold">Alice Johnson</h2>

                <p className="text-sm text-gray-500 mt-1">
                  alice.johnson@gmail.com
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div>
                <h3 className="text-sm font-medium mb-2">
                  Submission Date & Time :
                </h3>
                <div className="">
                  "Hi Support Team, I'm experiencing an issue logging into my
                  account after the recent app update. Whenever I try to enter
                  my credentials, I get an 'Invalid username or password' error,
                  even though I'm sure they are correct. I've tried resetting my
                  password multiple times, but the problem persists. I'm using
                  the latest version of the app on iOS. This is preventing me
                  from accessing my services. Please help!"
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Attached Media</h4>
                <div className="grid grid-cols-2 gap-3">
                  <img
                    className="w-full h-36 object-cover rounded"
                    src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=800&q=80"
                    alt="attachment"
                  />
                  <img
                    className="w-full h-36 object-cover rounded"
                    src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
                    alt="attachment"
                  />
                </div>
              </div>

              <div className="mt-6 border-y py-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1 flex text-center text-primary">
                    Submission Date & Time :
                  </div>
                  <div className="flex-1 px-4 py-2 bg-gray-100 rounded text-sm text-center">
                    Attached Media
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="grid grid-cols-1 gap-3">
                  <RichTextEditor
                    value={reply}
                    onChange={setReply}
                    placeholder="Compose your reply..."
                    className="min-h-[10rem]"
                  />

                  <div className="flex items-center justify-end">
                    <Select
                      onValueChange={(v) => {
                        setAssignee(v);
                      }}
                    >
                      <SelectTrigger className="w-48 rounded" size="sm">
                        <SelectValue placeholder="Select Template">
                          {assignee ?? "Select Template"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="template-1">
                          Apology Template
                        </SelectItem>
                        <SelectItem value="template-2">
                          Troubleshooting Steps
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <div className="flex items-center gap-3">
                      <Button className="rounded" variant="outline">
                        <MailIcon />
                        Send via email
                      </Button>
                      <Button className="rounded">
                        <MessageCircleIcon />
                        Send In-App Message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="bg-white p-6 rounded shadow flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Feedback Actions</h3>

          <div className="space-y-2">
            <Button className="rounded w-full">Mark as Resolved</Button>
            <Button variant="outline" className="rounded w-full">
              Archive Feedback
            </Button>
          </div>

          <div>
            <label className="text-sm font-medium">Assigned To</label>
            <div className="mt-2 flex gap-2">
              <Select onValueChange={() => null}>
                <SelectTrigger className="w-full rounded" size="sm">
                  <SelectValue>Select team member</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alice">Alice Johnson</SelectItem>
                  <SelectItem value="john">John Doe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              className="mt-2 bg-gray-100 w-full rounded"
            >
              Assign Team Member
            </Button>
          </div>

          <div>
            <h4 className="text-sm text-gray-700 font-medium mb-2">
              User Quick Info
            </h4>
            <div className="text-sm text-gray-700 space-y-1">
              <div>User ID: #U7890</div>
              <div>Registered: March 15, 2022</div>
              <div>Total Feedbacks: 3</div>
              <div className="mt-2">
                <Button variant="link" className="px-0">
                  View Full Profile
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </PageLayout>
  );
}
