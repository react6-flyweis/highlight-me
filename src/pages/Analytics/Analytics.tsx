import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Analytics() {
  return (
    <section className="flex flex-col gap-5">
      <div className="rounded-lg my-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-lg font-medium m-0">
            Welcome to InsightFlow Analytics
          </h1>
          <p className="mt-2 text-sm">
            Your comprehensive dashboard for understanding user behavior,
            content performance, and contest engagement. Select a section below
            to dive into detailed metrics.
          </p>
        </div>
        <div className="flex gap-3">
          <Button size="sm">Export PDF</Button>
          <Button size="sm">Export CSV</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>User Analytics</CardTitle>
            <CardDescription>
              Explore metrics related to user activity, sign-ups, and engagement
              trends.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-2">
              <Button asChild size="sm">
                <Link to="/analytics/users" className="inline-block">
                  View Details
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Analytics</CardTitle>
            <CardDescription>
              Analyze content submission patterns, types, and engagement across
              all posts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-2">
              <Button asChild size="sm">
                <Link to="/analytics/content" className="inline-block">
                  View Details
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contest Analytics</CardTitle>
            <CardDescription>
              Dive into contest performance, entry rates, and participant
              insights.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-2">
              <Button asChild size="sm">
                <Link to="/analytics/contests" className="inline-block">
                  View Details
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
