import { PageLayout } from "@/components/layouts/PageLayout";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { UsersBreadcrumb } from "@/components/UserManagement/UsersBreadcrumb";

export default function UserProfile() {
  // Static sample data for now
  const user = {
    name: "Alice Johnson",
    email: "alice.johnson@gmail.com",
    role: "Editor",
    status: "Active",
    joinDate: "03 Jan 2025",
    lastLogin: "03 Jan 2025, 10:30am",
    totalActions: 1250,
    reportsReceived: 3,
    contentUploaded: 87,
  };

  return (
    <PageLayout title="User Profile">
      <UsersBreadcrumb />
      <div className="grid grid-cols-12 gap-6">
        {/* Left column */}
        <div className="bg-white border rounded col-span-12 md:col-span-5 p-3">
          <div className="space-y-4">
            <div className="p-4 rounded-md border bg-white shadow-sm">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <img
                    src="/icons/users.svg"
                    alt={user.name}
                    className="rounded-full"
                  />
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="mt-4 text-sm">
                <div className="flex justify-between">
                  <span>Role :</span>
                  <span className="font-medium">{user.role}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status :</span>
                  <span className="font-medium text-green-600">
                    {user.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Join Date :</span>
                  <span className="font-medium">{user.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Login :</span>
                  <span className="font-medium">{user.lastLogin}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-md border bg-white shadow-sm">
              <h4 className="text-sm font-semibold mb-3">User Statistics</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Total Actions</div>
                  <div className="font-medium text-lg text-primary">
                    {user.totalActions}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Reports Received</div>
                  <div className="font-medium text-lg text-red-600">
                    {user.reportsReceived}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-muted-foreground">Content Uploaded</div>
                  <div className="font-medium text-primary">
                    {user.contentUploaded}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-md border bg-white shadow-sm">
              <h4 className="text-sm font-semibold mb-3">
                Administrative Actions
              </h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Reset Password
                </Button>
                <Button variant="outline" className="w-full">
                  Suspend Account
                </Button>
                <Button variant="destructive" className="w-full">
                  Block User
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="bg-white border rounded col-span-12 md:col-span-7 p-3">
          <h4 className="font-semibold mb-2">Activity Log</h4>
          <div className="p-4 rounded-md border bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="p-2">Time stamp</th>
                    <th className="p-2">Action type</th>
                    <th className="p-2">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "Login",
                    "Profile update",
                    "Content Creation",
                    "Password change",
                    "Login attempt",
                    "Report Submitted",
                  ].map((a, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-2">2025-08-15,10.00am</td>
                      <td className="p-2">{a}</td>
                      <td className="p-2">Sample detail for {a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-end">
              <Pagination className="w-fit justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>

          <h4 className="font-semibold my-3">Activity Log</h4>
          <div className="mt-4 p-4 rounded-md border bg-white shadow-sm">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-t pt-2">
                <div>2025-08-15,10.00am</div>
                <div>Warning</div>
                <div>Inappropriate content</div>
              </div>
              <div className="flex justify-between border-t pt-2">
                <div>2025-08-15,10.00am</div>
                <div>Suspension</div>
                <div>Inappropriate content</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
