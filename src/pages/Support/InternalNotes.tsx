import { useState } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { CreateNoteForm } from "@/components/Support/CreateNoteForm";

const mockNotes = new Array(6).fill(null).map((_, i) => ({
  id: i + 1,
  title: "MFA Method Selection",
  excerpt:
    "Choose the primary method users will use for Multi-Factor Authentication.",
  date: "2024-07-20",
}));

export default function InternalNotes() {
  const [selected, setSelected] = useState<number | null>(mockNotes[0].id);

  return (
    <PageLayout title="Internal Notes System">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* List column */}
        <div className="md:col-span-1">
          <div className="p-4 bg-white rounded border h-full">
            <div className="mb-4">
              <h3 className="font-medium">Ticket #</h3>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search notes..." className="pl-10 w-full" />
              </div>
            </div>

            <div className="divide-y max-h-[60vh] overflow-auto">
              {mockNotes.map((note) => (
                <button
                  key={note.id}
                  onClick={() => setSelected(note.id)}
                  className={`w-full text-left py-3 flex items-start justify-between hover:bg-gray-50 transition px-2 ${
                    selected === note.id ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{note.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {note.excerpt}
                    </div>
                  </div>
                  <div className="ml-3 text-xs text-gray-500">{note.date}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Editor column */}
        <div className="md:col-span-2">
          <CreateNoteForm />
        </div>
      </div>
    </PageLayout>
  );
}
