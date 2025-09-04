import { PageLayout } from "@/components/layouts/PageLayout";
// form UI moved to reusable component
import { useLocation, useNavigate, useParams } from "react-router";
import KeywordForm from "@/components/Moderation/KeywordForm";

type Keyword = {
  id: string;
  keyword: string;
  action: string;
  createdBy: string;
  dateAdded: string;
  status: "active" | "inactive";
  notes?: string;
};

export default function KeywordDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Accept full keyword object via navigation state when available.
  const state = (location.state as { row?: Keyword } | null) || null;
  const row: Keyword = state?.row ?? {
    id: id ?? "-",
    keyword: "(unknown)",
    action: "Flag",
    createdBy: "System",
    dateAdded: "-",
    status: "inactive",
    notes: "",
  };
  function onSave(payload: {
    id?: string;
    keyword: string;
    action: "Flag" | "Auto-Remove" | "Block Post";
    notes?: string;
    status: "active" | "inactive";
  }) {
    // TODO: call API to save changes
    console.log("save keyword", payload);
    navigate(-1);
  }

  return (
    <PageLayout title="Ban Keywords Manager">
      <div className="bg-card p-5">
        <div className="grid grid-cols-2 gap-5">
          <aside className="border p-4">
            <h3 className="mb-4 text-base font-medium">Ban keywords List</h3>

            <KeywordForm
              initial={{
                id: row.id,
                keyword: row.keyword,
                action:
                  (row.action as "Flag" | "Auto-Remove" | "Block Post") ??
                  "Flag",
                notes: row.notes,
                status: row.status === "active",
              }}
              onCancel={() => navigate(-1)}
              onSave={onSave}
            />
          </aside>

          <div className="border p-4">
            <h4 className="mb-2 text-base font-medium">Keyword Context</h4>
            <p className="mb-14 text-sm text-muted-foreground">
              Additional information and recent actions related to this keyword.
            </p>

            <div className=" p-4 rounded space-y-4">
              <div className="grid grid-cols-2 gap-2 items-center">
                <div className="">Details</div>
                <div className="text-sm text-muted-foreground" />

                <div className="text-xs text-muted-foreground">Created by</div>
                <div className="text-sm">{row.createdBy}</div>

                <div className="text-xs text-muted-foreground">Date Added</div>
                <div className="text-sm">{row.dateAdded}</div>
              </div>

              <div>
                <div className="mt-12 mb-2">Recent Activity</div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="px-3 py-1 rounded-full bg-teal-500 text-white text-nowrap text-xs">
                      Status Change
                    </span>
                    <div className="text-sm text-muted-foreground">
                      Status changed to{" "}
                      {row.status === "active" ? "enabled" : "disabled"} by{" "}
                      {row.createdBy}.
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs">
                      Action Update
                    </span>
                    <div className="text-sm text-muted-foreground">
                      Action type updated from '{row.action}' recently.
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="px-3 py-1 rounded-full bg-white border text-xs">
                      Note Added
                    </span>
                    <div className="text-sm text-muted-foreground">
                      {row.notes ? row.notes : "Notes updated by moderator."}
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="px-3 py-1 text-nowrap rounded-full bg-white border text-xs">
                      Keyword Created
                    </span>
                    <div className="text-sm text-muted-foreground">
                      Keyword '{row.keyword}' initially created by{" "}
                      {row.createdBy}.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
