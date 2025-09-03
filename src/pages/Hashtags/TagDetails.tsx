import { Link, useParams, useNavigate } from "react-router";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

export default function TagDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const tag = {
    id: id ?? "1",
    name: "#SocialMediaMarketing",
    category: "Digital Marketing",
    description:
      "The official hashtag for discussions, trends, and strategies related to social media marketing across various platforms and campaigns. Often used by professionals and businesses to share insights and best practices.",
    totalUsage: "154,823",
    createdAt: "1/15/2023 10:30:00 AM",
    updatedAt: "1/15/2023 10:30:00 AM",
    status: "Active",
  };

  const [createdDate, ...createdTimeParts] = tag.createdAt.split(" ");
  const createdTime = createdTimeParts.join(" ");
  const [updatedDate, ...updatedTimeParts] = tag.updatedAt.split(" ");
  const updatedTime = updatedTimeParts.join(" ");

  return (
    <PageLayout title="Hashtag Management > View" subtitle="">
      <div className="bg-white border border-gray-100 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm text-muted-foreground mb-2 font-semibold">
              Hashtag Name
            </h3>
            <div>
              <a
                className="text-primary hover:underline text-base font-semibold"
                href="#"
              >
                {tag.name}
              </a>
            </div>

            <div className="mt-4">
              <h4 className="text-sm text-muted-foreground mb-2 font-semibold">
                Description
              </h4>
              <p className="text-sm text-foreground">{tag.description}</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Date Created</span>
                </div>
                <div className="flex gap-2 mt-2 text-sm text-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>{createdDate}</div>
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>{createdTime}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm text-muted-foreground mb-1 font-semibold">
                Status
              </h4>
              <div className="text-sm text-foreground">{tag.status}</div>
            </div>
          </div>

          <div className="flex flex-col justify-center md:justify-start">
            <div className="text-sm text-muted-foreground mb-2 font-semibold">
              Category
            </div>
            <div className="mb-6">
              <a className="text-primary hover:underline">{tag.category}</a>
            </div>

            <div className="text-sm text-muted-foreground mb-2 font-semibold">
              Total Usage Count
            </div>
            <div className="text-primary text-2xl ">{tag.totalUsage}</div>

            <div>
              <div className="flex items-center gap-2 mt-8">
                <span className="font-semibold">Last Updated</span>
              </div>
              <div className="flex gap-2 mt-2 text-sm text-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>{updatedDate}</div>
                </div>

                <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>{updatedTime}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center items-center gap-3">
        <Link to="/hashtags/management" className="inline-block">
          <Button
            size="lg"
            variant="outline"
            className="w-32 rounded border-primary"
          >
            Cancel
          </Button>
        </Link>

        <Button
          size="lg"
          className="w-32 rounded"
          onClick={() => navigate(`/hashtags/management/edit/${tag.id}`)}
        >
          Edit Hashtag
        </Button>
      </div>
    </PageLayout>
  );
}
