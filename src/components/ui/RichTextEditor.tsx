import React, { Suspense, lazy, useEffect } from "react";
import { Button } from "./button";
import { Bold, Italic, Underline, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

type RichTextEditorProps = {
  value: string;
  onChange: (val: string) => void;
  theme?: string;
  placeholder?: string;
  className?: string;
};

type EditorLikeProps = {
  theme?: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
  placeholder?: string;
};

const TipTapLazy = lazy(async () => {
  // dynamically import tiptap pieces
  const tiptap = await import("@tiptap/react");
  const StarterKit = (await import("@tiptap/starter-kit")).default;
  const Placeholder = (await import("@tiptap/extension-placeholder")).default;
  //   const Underline = (await import("@tiptap/extension-underline")).default;
  // use the module's static type shape while keeping runtime dynamic import
  const { useEditor, EditorContent } =
    tiptap as unknown as typeof import("@tiptap/react");

  const TipTapWrapper: React.FC<EditorLikeProps> = ({
    value,
    onChange,
    className,
    placeholder,
  }) => {
    const editor = useEditor({
      extensions: [
        StarterKit,
        // Underline,
        Placeholder.configure({ placeholder: placeholder ?? "" }),
      ],
      content: value,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onUpdate: ({ editor: ed }: any) => {
        // ed is the editor instance provided by tiptap
        onChange(ed?.getHTML?.() ?? "");
      },
    });

    // keep editor content in sync when `value` changes from outside
    useEffect(() => {
      if (!editor) return;
      const html = editor.getHTML();
      if (value !== html) {
        // preserve selection=false to avoid moving caret when updating externally
        editor.commands.setContent(value, false);
      }
    }, [value, editor]);

    useEffect(() => {
      return () => editor?.destroy();
    }, [editor]);

    const toggleBold = () => {
      if (!editor) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (editor.chain() as any).focus().toggleBold().run();
    };

    const toggleItalic = () => {
      if (!editor) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (editor.chain() as any).focus().toggleItalic().run();
    };

    const toggleUnderline = () => {
      if (!editor) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (editor.chain() as any).focus().toggleUnderline().run();
    };

    const handleEditorClick = () => {
      if (!editor) return;
      editor.commands.focus();
    };

    return (
      <div className="richtext-wrapper h-full min-h-[18rem] flex flex-col">
        {/* toolbar: icons spread across the top */}
        {/* toolbar: 4 evenly spaced slots to match the visual spacing in the reference image */}
        <div className="grid grid-cols-4 items-center bg-[#F8F6F6] px-4 py-2">
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleBold}
              aria-label="Bold"
              className="text-black/90"
            >
              <Bold className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleItalic}
              aria-label="Italic"
              className="text-black/90"
            >
              <Italic className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleUnderline}
              aria-label="Underline"
              className="text-black/90"
            >
              <Underline className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              aria-label="More"
              className="text-black/90"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* editor content: take remaining height inside the wrapper and scroll when needed */}
        <div
          className="flex-1 bg-[#F8F6F6] mt-2 overflow-hidden flex flex-col cursor-text max-h-full"
          onClick={handleEditorClick}
        >
          <EditorContent
            editor={editor ?? undefined}
            className={cn(
              "flex-1 h-full p-4 text-sm leading-relaxed whitespace-pre-wrap break-words [&_.ProseMirror]:min-h-full [&_.ProseMirror]:outline-none [&_.ProseMirror]:h-full [&_.ProseMirror]:flex-1 [&_.ProseMirror]:cursor-text [&_.ProseMirror]:overflow-y-auto [&_.ProseMirror]:max-h-full",
              className
            )}
          />
        </div>
      </div>
    );
  };

  return { default: TipTapWrapper };
});

export default function RichTextEditor({
  value,
  onChange,
  theme = "snow",
  placeholder,
  className,
}: RichTextEditorProps) {
  const textareaFallback = (
    <textarea
      className={`w-full min-h-[18rem] h-full p-12 rounded bg-transparent text-gray-600 text-lg leading-relaxed overflow-auto ${
        className ?? ""
      }`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );

  return (
    <Suspense fallback={textareaFallback}>
      <TipTapLazy
        theme={theme}
        value={value}
        onChange={onChange}
        className={`${className} h-full min-h-full`}
        placeholder={placeholder}
      />
    </Suspense>
  );
}
