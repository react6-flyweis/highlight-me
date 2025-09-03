// ...existing code...
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function HashtagsQuickActions() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium">Filters & Quick Actions</h3>
      <p className="text-sm text-gray-500 mt-1">
        Refine your view or manage tags instantly.
      </p>

      <div className="mt-4 space-y-4">
        <label className="block text-sm">
          <span className="text-gray-700">Time Period</span>
          <Select>
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </label>

        <label className="block text-sm">
          <span className="text-gray-700">Category</span>
          <Select>
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="space">Space</SelectItem>
            </SelectContent>
          </Select>
        </label>

        <div className="mt-10 flex flex-col gap-4">
          <Link to="/hashtags/create" className="w-full">
            <Button variant="default" className="w-full">
              + Create New Tag
            </Button>
          </Link>
          <Button variant="outline">Manage hashtags</Button>
          <Button variant="outline">Manage categories</Button>
        </div>
      </div>
    </div>
  );
}
