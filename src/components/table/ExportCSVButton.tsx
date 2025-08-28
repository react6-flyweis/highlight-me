import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export interface ExportCSVButtonProps<TData> {
  rows: { original: TData }[];
  filename?: string;
  label?: string;
  className?: string;
}

export function ExportCSVButton<TData>({
  rows,
  filename = "export.csv",
  label = "Export CSV",
  className,
}: ExportCSVButtonProps<TData>) {
  function exportCSV() {
    if (!rows || rows.length === 0) return;

    // infer headers from first row's keys (coerce to string keys)
    const first = rows[0].original as unknown as Record<string, unknown>;
    const headers = Object.keys(first);
    const csv = [headers.join(",")]
      .concat(
        rows.map((r) =>
          headers
            .map((h) => {
              const obj = r.original as unknown as Record<string, unknown>;
              const v = obj[h];
              if (v == null) return "";
              const s = String(v).replace(/"/g, '""');
              return '"' + s + '"';
            })
            .join(",")
        )
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <Button
      size="sm"
      variant="default"
      onClick={exportCSV}
      className={className}
    >
      <Download className="h-4 w-4" />
      {label}
    </Button>
  );
}
