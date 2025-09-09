import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChangeStatusDialog } from "@/components/Support/ChangeStatusDialog";
import { AssignTeamMemberDialog } from "@/components/Support/AssignTeamMemberDialog";
import { MergeTicketsDialog } from "@/components/Support/MergeTicketsDialog";
import { FileTextIcon, Link2Icon, Trash2Icon } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export interface Ticket {
  ticketId: string;
  user: string;
  email: string;
  subject: string;
  priority?: string;
  status?: string;
  assignedTo?: string;
  createdDate?: string;
  updatedDate?: string;
  time?: string;
  description?: string;
  attachments?: { name: string; size?: string }[];
  reference?: string;
}

export function SupportRequestCard({ ticket }: { ticket: Ticket }) {
  const [status, setStatus] = useState<string | undefined>(ticket.status);
  const [openChangeStatus, setOpenChangeStatus] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [openMerge, setOpenMerge] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [assignedTo, setAssignedTo] = useState<string | undefined>(
    ticket.assignedTo
  );

  return (
    <>
      <Card className="rounded gap-0">
        <CardHeader className="">
          <CardTitle className="text-xl font-semibold">
            Subject: {ticket.subject}
          </CardTitle>
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Created: {ticket.createdDate}</span>
            <span>Last Updated: {ticket.updatedDate}</span>
          </div>
        </CardHeader>

        <CardContent className="">
          <div className="mt-5 text-gray-700 leading-relaxed text-sm">
            <p className="font-medium mb-2">Dear Support Team,</p>

            <p className="mb-2">{ticket.description}</p>

            <p className="mb-2 text-sm text-muted-foreground">
              Thank you,
              <br />
              <span className="font-medium">{ticket.user}</span>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-5 items-start mt-5">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileTextIcon className="w-4 h-4 text-gray-500" />
              <span>
                Attached:
                <a
                  href="#"
                  className="ml-2 text-teal-600 underline"
                  onClick={(e) => e.preventDefault()}
                >
                  {ticket.attachments?.[0]?.name}
                </a>
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link2Icon className="w-4 h-4" />
              Reference: <span className="ml-1">{ticket.reference}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button className="rounded" onClick={() => setOpenAssign(true)}>
              Assign Agent
            </Button>
            <Button
              className="rounded"
              variant="outline"
              onClick={() => setOpenChangeStatus(true)}
            >
              Change Status
            </Button>
            <Button
              className="rounded"
              variant="outline"
              onClick={() => setOpenMerge(true)}
            >
              Merge Ticket
            </Button>
            <Button
              className="bg-destructive hover:bg-red-600 rounded"
              onClick={() => setOpenConfirm(true)}
            >
              <Trash2Icon className="" />
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Avatar / aside block moved to page; dialogs kept here */}

      <ChangeStatusDialog
        open={openChangeStatus}
        onOpenChange={setOpenChangeStatus}
        currentStatus={status}
        onConfirm={(values) => {
          setStatus(values.to);
          console.log("Status changed:", values);
        }}
      />
      <AssignTeamMemberDialog
        open={openAssign}
        onOpenChange={setOpenAssign}
        current={assignedTo}
        onConfirm={(member) => {
          setAssignedTo(member?.name);
          console.log("Assigned to:", member);
        }}
      />
      <MergeTicketsDialog
        open={openMerge}
        onOpenChange={setOpenMerge}
        currentTicketId={ticket.ticketId}
        onConfirm={(ids) => {
          console.log("Merging tickets:", ids);
        }}
      />
      <ConfirmDialog
        open={openConfirm}
        onOpenChange={setOpenConfirm}
        title="Delete Ticket"
        description={`Are you sure you want to delete ${ticket.ticketId}? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => {
          console.log("Ticket deleted:", ticket.ticketId);
        }}
      />
    </>
  );
}
