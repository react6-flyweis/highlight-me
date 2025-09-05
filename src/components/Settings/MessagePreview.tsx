import sanitizeHtml from "sanitize-html";

type MessagePreviewProps = {
  content: string;
  language: string;
  active: boolean;
  updatedBy?: string | null;
  updatedAt?: string | null;
};

export function MessagePreview({
  content,
  language,
  active,
  updatedBy,
  updatedAt,
}: MessagePreviewProps) {
  return (
    <div className="p-6 bg-card rounded shadow-sm">
      <h4 className="text-base font-medium mb-1 text-foreground">
        Message Preview
      </h4>

      <div className="mt-3">
        <div className="p-4 rounded  bg-gray-100 text-sm text-foreground ">
          <div
            className="whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(content || "") }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-muted-foreground">Language</div>
          <div className="text-foreground font-medium">{language}</div>
        </div>

        <div>
          <div className="text-muted-foreground">Status</div>
          <div
            className={`inline-block px-2 py-0.5 rounded text-sm font-medium ${
              active
                ? "text-green-600 bg-green-50"
                : "text-destructive bg-destructive/10"
            }`}
          >
            {active ? "Active" : "Inactive"}
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm">
        <div className="">Last Updated By:</div>
        <div className="text-muted-foreground  font-medium mt-1">
          {updatedBy ?? "-"} on {updatedAt ?? "-"}
        </div>
      </div>
    </div>
  );
}
