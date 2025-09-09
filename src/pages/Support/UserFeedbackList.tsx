import { useMemo, useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import {
  userFeedbackColumns,
  type UserFeedbackRow,
} from "@/components/Support/userFeedbackColumns";
import {
  UserFeedbackFilters,
  type Filters,
} from "@/components/Support/UserFeedbackFilters";
import { PageLayout } from "@/components/layouts/PageLayout";

const SAMPLE_SUPPORT_DATA: UserFeedbackRow[] = [
  {
    id: 1,
    name: "Sarah",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
    time: "4.00am",
    subject: "Cannot log in after password reset attempt",
    date: "2024-07-28",
    status: "Active",
  },
  {
    id: 2,
    name: "Jason",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    time: "2:10pm",
    subject: "App crashes when uploading image",
    date: "2024-08-01",
    status: "InProgress",
  },
  {
    id: 3,
    name: "Monica",
    avatar: "https://randomuser.me/api/portraits/women/13.jpg",
    time: "9:20am",
    subject: "Feature request: scheduled posts",
    date: "2024-08-05",
    status: "Resolved",
  },
  {
    id: 4,
    name: "Alex",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
    time: "11:15am",
    subject: "Unable to change profile picture",
    date: "2024-07-15",
    status: "Active",
  },
  {
    id: 5,
    name: "Priya",
    avatar: "https://randomuser.me/api/portraits/women/15.jpg",
    time: "1:05pm",
    subject: "Missing translations in French",
    date: "2024-06-30",
    status: "Resolved",
  },
  {
    id: 6,
    name: "Daniel",
    avatar: "https://randomuser.me/api/portraits/men/16.jpg",
    time: "8:45am",
    subject: "Question about data retention",
    date: "2024-05-22",
    status: "Archived",
  },
  {
    id: 7,
    name: "Lina",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    time: "6:00pm",
    subject: "Request: more themes",
    date: "2024-08-10",
    status: "InProgress",
  },
  {
    id: 8,
    name: "Omar",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    time: "3:30pm",
    subject: "Incorrect analytics numbers",
    date: "2024-08-11",
    status: "Active",
  },
  {
    id: 9,
    name: "Grace",
    avatar: "https://randomuser.me/api/portraits/women/19.jpg",
    time: "10:00am",
    subject: "Error 500 when saving drafts",
    date: "2024-04-05",
    status: "Resolved",
  },
  {
    id: 10,
    name: "Tom",
    avatar: "https://randomuser.me/api/portraits/men/20.jpg",
    time: "12:00pm",
    subject: "How to export user data?",
    date: "2024-08-12",
    status: "Active",
  },
  {
    id: 11,
    name: "Nina",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    time: "9:00am",
    subject: "Feedback: onboarding flow",
    date: "2024-08-13",
    status: "InProgress",
  },
  {
    id: 12,
    name: "Ethan",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    time: "7:30am",
    subject: "Request: CSV export for reports",
    date: "2024-08-14",
    status: "Archived",
  },
];

export default function UserFeedbackList() {
  const [localFilters, setLocalFilters] = useState<Filters>({
    query: "",
    statusFilter: "All",
    sortBy: "newest",
  });

  const filtered = useMemo(() => {
    const q = localFilters.query.trim().toLowerCase();
    let rows = SAMPLE_SUPPORT_DATA.filter((r) => {
      if (
        localFilters.statusFilter !== "All" &&
        r.status !== localFilters.statusFilter
      )
        return false;
      if (!q) return true;
      return `${r.id} ${r.name} ${r.subject} ${r.date} ${r.status}`
        .toLowerCase()
        .includes(q);
    });

    rows = rows.sort((a, b) => {
      if (localFilters.sortBy === "newest") return b.date.localeCompare(a.date);
      return a.date.localeCompare(b.date);
    });

    return rows;
  }, [localFilters]);

  return (
    <PageLayout
      title="User Feedback List"
      actions={
        <UserFeedbackFilters
          filters={localFilters}
          onChange={setLocalFilters}
        />
      }
    >
      {/* <div className="ml-auto">
        <Button
          variant="outline"
          onClick={() =>
            setLocalFilters({
              query: "",
              statusFilter: "All",
              sortBy: "newest",
            })
          }
        >
          Reset
        </Button>
      </div> */}

      <div className="mb-5 mt-4">
        <h2 className="text-lg font-semibold">All Feedback</h2>
        <p className="text-sm">
          All Feedback Manage and respond to customer feedback efficiently.
        </p>
      </div>

      <DataTable columns={userFeedbackColumns} data={filtered} />
    </PageLayout>
  );
}
