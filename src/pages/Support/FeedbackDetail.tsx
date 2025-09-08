import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquareReply, Archive } from "lucide-react";
import { PageLayout } from "@/components/layouts/PageLayout";

export default function FeedbackDetail() {
  const [reply, setReply] = useState("");

  return (
    <PageLayout title="Detailed Feedback / Support Request View">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="md:col-span-2 bg-white p-6 rounded shadow">
          <div className="border rounded p-6 bg-white">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Avatar className="size-20">
                  <AvatarImage
                    src="/images/content-moderation.png"
                    alt="avatar"
                  />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-semibold leading-tight">
                  Alice Johnson
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  alice.johnson@gmail.com
                </p>
              </div>
            </div>
            <div className="mt-5 text-sm text-muted-foreground space-y-0.5">
              <div className="flex justify-between">
                <span>Submission Date & Time :</span>
                <span className="text-gray-900 font-medium">03 Jan 2025</span>
              </div>
              <div className="flex justify-between">
                <span>Type :</span>
                <span className="text-gray-900">03 Jan 2025, 10.30am</span>
              </div>
              <div className="flex justify-between">
                <span>Priority Tag :</span>
                <span className="text-gray-900">03 Jan 2025, 10.30am</span>
              </div>
              <div className="flex justify-between items-end">
                <span>Status :</span>
                <span className="text-gray-900 font-medium">Editor</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Main Content Area</h3>
              <div className="p-4 border rounded  text-gray-700 min-h-[6rem]">
                Original Message / Feedback Content
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">
                Attached Media (if any)
              </h4>
              <div className="p-3 border rounded bg-white text-sm text-gray-600 min-h-[3rem]">
                No attachments
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Conversation Thread</h3>

            <RichTextEditor
              value={reply}
              onChange={setReply}
              placeholder="Write a reply..."
              className="min-h-[12rem]"
            />

            <div className="flex items-center gap-3 mt-5">
              <Button
                className="border-primary text-primary flex-1 rounded"
                variant="outline"
              >
                Send Reply
              </Button>
              <Button
                className="border-primary text-primary flex-1 rounded"
                variant="outline"
              >
                Save Draft
              </Button>
              <Button
                className="border-primary text-primary flex-1 rounded"
                variant="outline"
              >
                Mark as Resolved
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="bg-white p-6 rounded shadow flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Sidebar</h3>
          <div>
            <div className="h-28 border rounded p-3 text-sm text-gray-600">
              Internal Notes
            </div>
          </div>

          <div>
            <div className="h-28 border rounded p-3 text-sm text-gray-600">
              Related Tickets
            </div>
          </div>

          <div>
            <div className="h-28 border rounded p-3 text-sm text-gray-600">
              Tags
            </div>
            {/* <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-gray-100 rounded">bug</span>
              <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                high-priority
              </span>
            </div> */}
          </div>

          <div className="mt-auto">
            <h4 className="text-sm font-medium mb-2">Action Toolbar</h4>
            <div className=" w-fit flex border items-center gap-2">
              <Button variant="ghost" title="View">
                <Eye className="w-4 h-4 text-gray-600" />
              </Button>
              <Button variant="ghost" title="Message">
                <MessageSquareReply className="w-4 h-4 text-gray-600" />
              </Button>
              <Button variant="ghost" title="Tags">
                <Archive className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </PageLayout>
  );
}
