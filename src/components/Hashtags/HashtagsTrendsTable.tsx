import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { Link } from "react-router";
import upTrend from "@/assets/icons/up-trend.svg";
import downTrend from "@/assets/icons/down-trend.svg";

type Row = [number, string, number];

export function HashtagsTrendsTable({
  rows = [
    [1, "#AllInnovation", 3],
    [2, "#SustainableTech", -2],
    [3, "#DigitalPrivacy", 1],
    [4, "#FutureOfWork", 3],
    [5, "#SpaceExploration", 3],
    [6, "#HealthTech", 3],
  ] as Row[],
}: {
  rows?: Row[];
}) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Trending Hashtags</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Hashtag</TableHead>
            <TableHead>Change</TableHead>
            <TableHead>Trend</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => {
            const trendSrc = row[2] < 0 ? downTrend : upTrend;

            return (
              <TableRow key={row[0]}>
                <TableCell>{row[0]}</TableCell>
                <TableCell>{row[1]}</TableCell>
                <TableCell
                  className={`w-12 font-medium text-sm text-muted-foreground ${
                    row[2] < 0
                      ? "text-red-600"
                      : row[2] > 0
                      ? "text-teal-600"
                      : ""
                  }`}
                >
                  {row[2]} ranks
                </TableCell>
                <TableCell>
                  <img
                    src={trendSrc}
                    alt="trend"
                    className="size-8 inline-block"
                  />
                </TableCell>
                <TableCell>
                  <Link to={`/hashtags/management/${row[0]}`}>
                    <Button variant="ghost" size="sm">
                      <EyeIcon className="size-5" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
