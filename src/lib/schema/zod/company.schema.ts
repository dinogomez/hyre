import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const CompanySchema = z.object({
    companyName: z.string().min(1, "Company name is required"),
    companyDesc: z.string().min(1, "Company description is required"),
    companyEmail: z
        .string()
        .min(1, "Company Email is required")
        .email("Invalid email address"),
    website: z
        .string()
        .url("Please enter a valid https url.")
        .optional()
        .or(z.literal("")),
    province: z.string().min(1, "Select a region first."),
    city: z.string().min(1, "Select a province first."),
    barangay: z.string(),
    industry: z
        .array(z.string())
        .refine((value) => value.some((item) => item), {
            message: "You have to select at least one industry.",
        }),
    companyLogo: z
        .custom<File>((val) => val instanceof File, "Company logo is required.")
        .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5mb`)
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: "Please choose a supported format.",
        }),
    numEmployee: z.string().min(1, "Number of employees is required"),
});
