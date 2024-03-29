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
    HelpCircle,
    Heading,
} from "lucide-react";

import { Toggle } from "../ui/toggle";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";

type Props = {
    editor: Editor | null;
};

export function Toolbar({ editor }: Props) {
    if (!editor) {
        return null;
    }

    return (
        <div className="flex items-center divide-x divide-solid rounded-t-md border-x border-t border-input">
            <div className="">
                <Toggle
                    size="sm"
                    pressed={editor.isActive("heading")}
                    onPressedChange={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                >
                    <Heading className="h-4 w-4" />
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
            <div className="flex items-center">
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

                <Popover>
                    <PopoverTrigger asChild>
                        <HelpCircle className="h-4 w-4 fill-primary text-white hover:cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">
                                    Toolbar
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    These are the toolbar items.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-6 items-center gap-2">
                                    <Heading className="h-4 w-4" />
                                    <Label>Heading</Label>
                                </div>
                                <div className="grid grid-cols-6 items-center gap-2">
                                    <Bold className="h-4 w-4" />
                                    <Label>Bold</Label>
                                </div>
                                <div className="grid grid-cols-6 items-center gap-2">
                                    <Italic className="h-4 w-4" />
                                    <Label>Italic</Label>
                                </div>
                                <div className="grid grid-cols-6 items-center gap-2">
                                    <Underline className="h-4 w-4 " />
                                    <Label>Underline</Label>
                                </div>
                                <div className="grid grid-cols-6 items-center gap-2">
                                    <Strikethrough className="h-4 w-4 " />
                                    <Label>Strikethrough</Label>
                                </div>
                                <div className="grid grid-cols-6 items-center gap-2">
                                    <List className="h-4 w-4" />
                                    <Label>List</Label>
                                </div>
                                <div className="grid grid-cols-6 items-center gap-2">
                                    <ListOrdered className="h-4 w-4" />
                                    <Label className="col-span-4">
                                        Ordered List
                                    </Label>
                                </div>
                                <div className="grid grid-cols-6 items-center gap-2">
                                    <Minus className="h-4 w-4" />
                                    <Label className="col-span-4">
                                        Horizontal Ruler
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
