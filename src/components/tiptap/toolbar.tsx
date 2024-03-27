"use client";

import { type Editor } from "@tiptap/react";
import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Minus,
    Underline,
} from "lucide-react";

import { Toggle } from "../ui/toggle";

type Props = {
    editor: Editor | null;
};

export function Toolbar({ editor }: Props) {
    if (!editor) {
        return null;
    }

    return (
        <div className="flex items-center divide-x divide-solid rounded-md">
            <div className="">
                <Toggle
                    size="sm"
                    pressed={editor.isActive("heading")}
                    onPressedChange={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                >
                    <Heading2 className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive("bold")}
                    onPressedChange={() =>
                        editor.chain().focus().toggleBold().run()
                    }
                >
                    <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive("italic")}
                    onPressedChange={() =>
                        editor.chain().focus().toggleItalic().run()
                    }
                >
                    <Italic className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive("underline")}
                    onPressedChange={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                >
                    <Underline className="h-4 w-4 " />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive("strike")}
                    onPressedChange={() =>
                        editor.chain().focus().toggleStrike().run()
                    }
                >
                    <Strikethrough className="h-4 w-4 " />
                </Toggle>
            </div>
            <div className="">
                <Toggle
                    size="sm"
                    pressed={editor.isActive("bulletList")}
                    onPressedChange={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    <List className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive("orderedList")}
                    onPressedChange={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                >
                    <ListOrdered className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive("horizontalRule")}
                    onPressedChange={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                >
                    <Minus className="h-4 w-4" />
                </Toggle>
            </div>
        </div>
    );
}
