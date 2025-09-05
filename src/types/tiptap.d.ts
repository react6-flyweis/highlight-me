// Minimal TipTap types used by RichTextEditor to avoid `any` casts
declare module "@tiptap/react" {
  // Minimal subset of the Editor type used by RichTextEditor
  export interface MinimalEditor {
    getHTML(): string;
    commands: {
      setContent: (content: string, emitUpdate?: boolean) => void;
      clearNodes: () => {
        setContent: (content: string, emitUpdate?: boolean) => void;
        run: () => void;
      };
      focus: () => { run: () => void };
      toggleBold: () => { run: () => void };
      toggleItalic: () => { run: () => void };
    } & Record<string, unknown>;
    chain: () => {
      focus: () => {
        toggleBold?: () => { run: () => void };
        toggleItalic?: () => { run: () => void };
        run: () => void;
      };
      run: () => void;
    };
    destroy: () => void;
  }

  export function useEditor(options?: unknown): MinimalEditor | null;
  export const EditorContent: React.FC<{
    editor?: MinimalEditor;
    className?: string;
  }>;
}

declare module "@tiptap/starter-kit" {
  const StarterKit: unknown;
  export default StarterKit;
}

declare module "@tiptap/extension-placeholder" {
  const Placeholder: {
    configure: (opts: { placeholder?: string }) => unknown;
  };
  export default Placeholder;
}
