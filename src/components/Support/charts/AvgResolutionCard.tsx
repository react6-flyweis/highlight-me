import React from "react";
import AvgResolutionBar from "@/components/Support/charts/AvgResolutionBar";

type Props = {
  value?: string;
  subtitle?: string;
  chart?: React.ReactNode;
};

export default function AvgResolutionCard({
  value = "1d 8h",
  subtitle = "Compared to last Month",
  chart,
}: Props) {
  return (
    <div className="p-4 bg-white rounded border h-full">
      <h3 className="text-sm font-medium mb-2">Average Resolution Time</h3>
      <div className="flex items-center justify-center text-gray-400">
        {chart ?? <AvgResolutionBar id="avg-resolution-bar" height={160} />}
      </div>
      <div className="mt-3 text-2xl font-semibold">{value}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </div>
  );
}
