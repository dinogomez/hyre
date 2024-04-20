import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { iObject } from "./types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getLabelById(
    objects: iObject[],
    id: string
): string | undefined {
    const matchingObject = objects.find((obj) => obj.id === id);
    return matchingObject ? matchingObject.label : undefined;
}
export const getInitials = (fullName: string) => {
    const initials = fullName
        .split(" ")
        .map((name) => name.charAt(0).toUpperCase())
        .join("");
    return initials.slice(0, 2); // Return only the first two initials
};

export const getFirstSentence = (paragraph: string) => {
    const index = paragraph.indexOf(".");
    return index !== -1 ? paragraph.substring(0, index + 1).trim() : paragraph;
};

export const getFullName = ({
    firstName,
    lastName,
}: {
    firstName: string;
    lastName: string;
}) => {
    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const capitalizedFirstName = capitalizeFirstLetter(firstName);
    const capitalizedLastName = capitalizeFirstLetter(lastName);

    return `${capitalizedFirstName} ${capitalizedLastName}`;
};

export const getImageExtension = (imageData: string): string => {
    return imageData.substring(
        "data:image/".length,
        imageData.indexOf(";base64")
    );
};

export const convertBase64ToBuffer = (base64String: string): Buffer => {
    return Buffer.from(base64String.replace(/^.+,/, ""), "base64");
};

export const getRemoteImage = (url: string) =>
    `${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/${url}`;
