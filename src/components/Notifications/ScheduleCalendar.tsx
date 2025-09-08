import { useMemo, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type EventItem = {
  id: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  time?: string;
};

const EVENT_STYLES = [
  { bg: "bg-teal-600", text: "text-white" },
  { bg: "bg-cyan-300", text: "text-black" },
  { bg: "bg-emerald-700", text: "text-white" },
  { bg: "bg-rose-400", text: "text-black" },
];

function pickStyle(id: string) {
  const n = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return EVENT_STYLES[n % EVENT_STYLES.length];
}

export function ScheduleCalendar({
  initialEvents: events = [],
}: {
  initialEvents?: EventItem[];
}) {
  const today = new Date();
  const [current, setCurrent] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = current.getFullYear();
  const month = current.getMonth();

  const startDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const grid = useMemo(() => {
    // build rows of 7 cells but only as many weeks as needed (no extra empty bottom row)
    const cells: (number | null)[] = [];
    for (let i = 0; i < startDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    // if the last week is completely empty (all nulls) drop it
    while (cells.length % 7 !== 0) cells.push(null);
    // remove trailing full-empty weeks
    for (let i = cells.length - 1; i >= 0; i -= 7) {
      const week = cells.slice(i - 6, i + 1);
      if (week.every((c) => c === null)) {
        cells.splice(i - 6, 7);
      } else break;
    }
    return cells;
  }, [startDay, daysInMonth]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">Schedule Notification list</div>
        <div className="flex items-center gap-3">
          {/* <div className="text-sm text-muted-foreground">
            Notifications: {events.length}
          </div> */}
          <Select
            value={String(year)}
            onValueChange={(v: string) =>
              setCurrent(new Date(Number(v || year), current.getMonth(), 1))
            }
          >
            <SelectTrigger className="bg-transparent" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 5 }).map((_, i) => {
                const y = today.getFullYear() - 2 + i;
                return (
                  <SelectItem key={y} value={String(y)}>
                    {y}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 border bg-white rounded-md divide-x divide-y">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
          <div key={w} className="text-center font-semibold py-3">
            {w}
          </div>
        ))}

        {grid.map((cell, idx) => {
          if (cell === null) return <div key={idx} className="h-24 p-3"></div>;
          const cellIso = `${year.toString().padStart(4, "0")}-${(month + 1)
            .toString()
            .padStart(2, "0")}-${cell.toString().padStart(2, "0")}`;
          const dayEvents = events.filter((e) => e.date === cellIso);
          return (
            <div key={idx} className="relative h-24 p-3">
              <div className="absolute top-2 right-3 text-sm text-slate-700 text-right">
                {cell}
              </div>

              <div className="h-full flex flex-col items-start justify-start gap-2 px-2 pt-6">
                {dayEvents.length === 0 ? (
                  <div className="w-full h-full flex items-start text-xs text-muted-foreground">
                    &nbsp;
                  </div>
                ) : (
                  <div className="flex flex-col items-start w-full">
                    {dayEvents.map((ev) => {
                      const style = pickStyle(ev.id);
                      return (
                        <div
                          key={ev.id}
                          className={`${style.bg} ${style.text} rounded px-3 py-1 mb-2 inline-block max-w-full text-left shadow-sm`}
                          title={`${ev.title}${ev.time ? ` • ${ev.time}` : ""}`}
                        >
                          <div className="text-sm font-semibold leading-tight">
                            {ev.title}
                          </div>
                          {ev.time && (
                            <div className="text-xs opacity-90 mt-0.5">
                              {ev.time}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="sr-only">Interactive event creation disabled</div>
    </div>
  );
}
