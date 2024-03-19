import { type ClassValue, clsx } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { getUser } from "./auth";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

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
