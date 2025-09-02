import { useEffect, useState } from "react";
import { subDays, startOfToday } from "date-fns";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { DateRangeField } from "@/components/DateRangeField";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type Preset = "today" | "7days" | "30days" | "custom";

export function DateRangeSelector({
  value,
  onChange,
}: {
  value?: DateRange | undefined;
  onChange?: (range: DateRange | undefined) => void;
}) {
  const [preset, setPreset] = useState<Preset>("today");
  const [range, setRange] = useState<DateRange | undefined>(value);

  useEffect(() => {
    setRange(value);
  }, [value]);

  useEffect(() => {
    // when preset changes (and is not custom), compute a range and notify parent
    if (preset === "custom") {
      // leave range as-is
      if (onChange) onChange(range);
      return;
    }

    const today = startOfToday();
    let from: Date | undefined = undefined;
    let to: Date | undefined = today;

    if (preset === "today") {
      from = today;
      to = today;
    } else if (preset === "7days") {
      from = subDays(today, 6);
    } else if (preset === "30days") {
      from = subDays(today, 29);
    }

    const newRange: DateRange = { from, to };
    setRange(newRange);
    if (onChange) onChange(newRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset]);

  function handlePreset(p: Preset) {
    setPreset(p);
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Time Range:</span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline">
            {preset === "today"
              ? "Today"
              : preset === "7days"
              ? "Last 7 Days"
              : preset === "30days"
              ? "Last 30 Days"
              : "Custom"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <div className="flex flex-col gap-2 p-2">
            <DropdownMenuItem asChild>
              <button
                className={`w-full text-left rounded px-2 py-1 ${
                  preset === "today" ? "bg-muted" : ""
                }`}
                onClick={() => handlePreset("today")}
              >
                Today
              </button>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <button
                className={`w-full text-left rounded px-2 py-1 ${
                  preset === "7days" ? "bg-muted" : ""
                }`}
                onClick={() => handlePreset("7days")}
              >
                Last 7 Days
              </button>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <button
                className={`w-full text-left rounded px-2 py-1 ${
                  preset === "30days" ? "bg-muted" : ""
                }`}
                onClick={() => handlePreset("30days")}
              >
                Last 30 Days
              </button>
            </DropdownMenuItem>

            <div className="border-t mt-1 pt-2">
              <div className="text-xs text-muted-foreground px-2 pb-2">
                Custom range
              </div>
              <DateRangeField
                value={range}
                onChange={(r) => {
                  setPreset("custom");
                  setRange(r);
                  if (onChange) onChange(r);
                }}
              />
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
