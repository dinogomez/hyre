import React from "react";
import {
    Command,
    CommandList,
    CommandItem,
    CommandGroup,
    CommandEmpty,
    CommandInput,
} from "@/components/ui/command";
import { type Tag as TagType } from "./tag-input";

type AutocompleteProps = {
    tags: TagType[];
    setTags: React.Dispatch<React.SetStateAction<TagType[]>>;
    autocompleteOptions: TagType[];
    maxTags?: number;
    onTagAdd?: (tag: string) => void;
    allowDuplicates: boolean;
    placeholder: string | undefined;
    inputRef: React.RefObject<HTMLInputElement>;
    inputValue: string | undefined;
    handleInputChange: React.FormEventHandler<HTMLInputElement> | undefined;
    handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> | undefined;
    onFocus: React.FocusEventHandler<HTMLInputElement> | undefined;
    onBlur: React.FocusEventHandler<HTMLInputElement> | undefined;
};

export const Autocomplete: React.FC<AutocompleteProps> = ({
    tags,
    setTags,
    autocompleteOptions,
    maxTags,
    onTagAdd,
    allowDuplicates,
    placeholder,
    inputRef,
    inputValue,
    handleInputChange,
    handleKeyDown,
    onFocus,
    onBlur,
}) => {
    const [inputFocused, setInputFocused] = React.useState(false);

    return (
        <Command
            className={`mt-1 border ${
                maxTags !== undefined && tags.length >= maxTags ? "hidden" : ""
            }`}
            onFocus={() => setInputFocused(true)}
            onBlur={(e) => e.relatedTarget === null && setInputFocused(false)}
        >
            <CommandList>
                <CommandInput
                    placeholder={
                        maxTags !== undefined && tags.length >= maxTags
                            ? "Max tags reached"
                            : placeholder
                    }
                    ref={inputRef}
                    value={inputValue}
                    disabled={maxTags !== undefined && tags.length >= maxTags}
                    onChangeCapture={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="w-full"
                />
                {inputFocused &&
                    maxTags !== undefined &&
                    tags.length < maxTags && (
                        <CommandGroup heading="Suggestions">
                            <CommandEmpty>No results found.</CommandEmpty>

                            {autocompleteOptions.map((option) => (
                                <CommandItem key={option.id}>
                                    <div
                                        onClick={() => {
                                            if (
                                                maxTags &&
                                                tags.length >= maxTags
                                            )
                                                return;
                                            if (
                                                !allowDuplicates &&
                                                tags.some(
                                                    (tag) =>
                                                        tag.text === option.text
                                                )
                                            )
                                                return;
                                            setTags([...tags, option]);
                                            onTagAdd?.(option.text);
                                        }}
                                        className="w-full"
                                    >
                                        {option.text}
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
            </CommandList>
        </Command>
    );
};
