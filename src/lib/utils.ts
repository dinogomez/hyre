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

export const getTimeDifference = (timestamp: Date) => {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - timestamp.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 60) {
        return "POSTED RECENTLY";
    } else if (hours < 24) {
        return `POSTED ${hours} HOUR${hours > 1 ? "S" : ""} AGO`;
    } else if (days < 30) {
        return `POSTED ${days} DAY${days > 1 ? "S" : ""} AGO`;
    } else if (months < 12) {
        return `POSTED ${months} MONTH${months > 1 ? "S" : ""} AGO`;
    } else {
        return `POSTED ${years} YEAR${years > 1 ? "S" : ""} AGO`;
    }
};

export const getRemoteImage = (url: string) =>
    `${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/${url}`;
