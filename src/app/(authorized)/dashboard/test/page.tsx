"use client";
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { v4 as uuid } from "uuid";
import { CheckCircle } from "lucide-react";
import { Tag, TagInput } from "@/components/ui/tag/tag-input";
import { Label } from "@/components/ui/label";
import { Markets } from "@/lib/data/data.markets";

export default function Props() {
    const [autocompleteTags, setAutocompleteTags] = React.useState<Tag[]>([]);
    return (
        <section id="props" className="w-full max-w-5xl py-8">
            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                Props
            </h2>
            <div className="w-full">
                <h3 className="font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight">
                    Autocomplete
                </h3>
                <p className="[&amp;:not(:first-child)]:mt-6 text-normal leading-7">
                    Enable or disable the autocomplete feature for the tag
                    input.
                </p>
                <div className="preview relative mt-2 flex min-h-[350px] w-full items-center justify-center rounded-md border p-10 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <div className="max-w-[450px] space-y-2">
                        <Label htmlFor="">Topics</Label>
                        <TagInput
                            
                            placeholder="Enter a topic"
                            tags={autocompleteTags}
                            enableAutocomplete
                            maxTags={3}
                            restrictTagsToAutocompleteOptions
                            autocompleteOptions={Markets}
                            className="sm:min-w-[450px]"
                            setTags={(newTags) => {
                                setAutocompleteTags(newTags);
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
