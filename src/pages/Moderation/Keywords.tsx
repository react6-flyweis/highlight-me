import { ModerationNav } from "@/components/Moderation/moderationNav";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Plus, EditIcon, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Link, useNavigate } from "react-router";

type Keyword = {
  id: string;
  keyword: string;
  action: string;
  createdBy: string;
  dateAdded: string;
  status: "active" | "inactive";
};

const sampleData: Keyword[] = [
  {
    id: "1",
    keyword: "insulting_term_01",
    action: "Flag",
    createdBy: "Moderator Alpha",
    dateAdded: "2023-11-15",
    status: "active",
  },
  {
    id: "2",
    keyword: "hate_speech_phrase",
    action: "Auto-Remove",
    createdBy: "Moderator Alpha",
    dateAdded: "2023-11-15",
    status: "active",
  },
  {
    id: "3",
    keyword: "spam_link_pattern",
    action: "Flag",
    createdBy: "Moderator Alpha",
    dateAdded: "2023-11-15",
    status: "active",
  },
  {
    id: "4",
    keyword: "misinformation_tag",
    action: "Auto-Remove",
    createdBy: "Moderator Alpha",
    dateAdded: "2023-11-15",
    status: "active",
  },
  {
    id: "5",
    keyword: "violent_threat",
    action: "Block Post",
    createdBy: "Moderator Alpha",
    dateAdded: "2023-11-15",
    status: "active",
  },
  {
    id: "6",
    keyword: "phishing_domain_01",
    action: "Block Post",
    createdBy: "Moderator Alpha",
    dateAdded: "2023-11-15",
    status: "inactive",
  },
  {
    id: "7",
    keyword: "abusive_phrase_x",
    action: "Auto-Remove",
    createdBy: "Moderator Alpha",
    dateAdded: "2023-11-15",
    status: "active",
  },
  {
    id: "8",
    keyword: "self_harm_term",
    action: "Auto-Remove",
    createdBy: "Moderator Alpha",
    dateAdded: "2023-11-15",
    status: "inactive",
  },
  {
    id: "9",
    keyword: "malicious_file_ext",
    action: "Flag",
    createdBy: "Moderator Alpha",
    dateAdded: "2023-11-15",
    status: "active",
  },
  {
    id: "10",
    keyword: "insulting_term_01_dup",
    action: "Auto-Remove",
    createdBy: "Moderator Alpha",
    dateAdded: "2023-11-15",
    status: "active",
  },
];

export default function Keywords() {
  const navigate = useNavigate();

  //   const [rows, setRows] = useState<Keyword[]>(sampleData);

  //   function toggleStatus(id: string, next: boolean) {
  //     setRows((prev) =>
  //       prev.map((r) =>
  //         r.id === id ? { ...r, status: next ? "active" : "inactive" } : r
  //       )
  //     );
  //   }
  return (
    <PageLayout title="Ban Keywords Manager">
      <ModerationNav />

      <div className="flex items-center justify-end mb-6">
        <Link
          to="/tools/keywords/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white shadow-sm hover:opacity-95"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">Add New Notification</span>
        </Link>
      </div>

      <div className="bg-card p-4">
        <h3 className="mb-6 text-lg font-semibold text-foreground">
          Ban keywords List
        </h3>

        <div className="overflow-x-auto b border rounded-lg p-3">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="text-sm text-muted-foreground">
                <th className="py-2 pr-4">Keyword</th>
                <th className="py-2 pr-4">Action Type</th>
                <th className="py-2 pr-4">Created By</th>
                <th className="py-2 pr-4">Date Added</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="py-3">{row.keyword}</td>
                  <td className="py-3 text-sm text-muted-foreground">
                    {row.action}
                  </td>
                  <td className="py-3 text-sm text-muted-foreground">
                    {row.createdBy}
                  </td>
                  <td className="py-3 text-sm text-muted-foreground">
                    {row.dateAdded}
                  </td>
                  <td className="py-3">
                    <Switch
                      checked={row.status === "active"}
                      aria-label={`Toggle status for ${row.keyword}`}
                    />
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          navigate(`/tools/keywords/${row.id}`, {
                            state: { row },
                          })
                        }
                        className="inline-flex items-center p-2 rounded hover:bg-muted"
                      >
                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button className="inline-flex items-center p-2 rounded hover:bg-muted">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
