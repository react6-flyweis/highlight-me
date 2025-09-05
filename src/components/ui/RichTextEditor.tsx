import React, { Suspense, lazy } from "react";
import { Button } from "./button";
import { Bold, Italic, Underline } from "lucide-react";

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
    React.useEffect(() => {
      if (!editor) return;
      const html = editor.getHTML();
      if (value !== html) {
        // preserve selection=false to avoid moving caret when updating externally
        editor.commands.setContent(value, false);
      }
    }, [value, editor]);

    React.useEffect(() => {
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

    return (
      <div className="richtext-wrapper">
        {/* toolbar: icons spread across the top */}
        <div className="flex items-center bg-gray-200 justify-start gap-2 px-4 py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleBold}
            aria-label="Bold"
            className="text-black/90"
          >
            <Bold className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleItalic}
            aria-label="Italic"
            className="text-black/90"
          >
            <Italic className="w-4 h-4" />
          </Button>

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

        {/* editor content: roomy padding and muted large text */}
        <EditorContent
          editor={editor ?? undefined}
          className={`min-h-40 h-full p-1 mt-2 bg-gray-200 text-sm leading-relaxed ${
            className ?? ""
          }`}
        />
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
      className={`w-full min-h-[18rem] p-12 rounded bg-transparent text-gray-600 text-lg leading-relaxed ${
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
        className={className}
        placeholder={placeholder}
      />
    </Suspense>
  );
}
