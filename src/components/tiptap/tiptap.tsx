"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./toolbar";
import BulletList from "@tiptap/extension-bullet-list";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";

export default function Tiptap({
    onChange,
}: {
    onChange: (richText: string) => void;
}) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    HTMLAttributes: {
                        class: "mb-1 text-xl font-bold",
                    },
                },
                bulletList: {
                    HTMLAttributes: {
                        class: "ml-4 list-disc",
                    },
                },
            }),
            Underline,
        ],

        editorProps: {
            attributes: {
                class: "text-sm w-full rounded-b-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 min-h-20",
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML());
            console.log(editor.getHTML());
        },
    });

    return (
        <div className="flex flex-col">
            <Toolbar editor={editor} />
            <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
        </div>
    );
}
