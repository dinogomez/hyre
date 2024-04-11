import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const CompanySchema = z.object({
    company_Name: z.string().min(1, "Company name is required"),
    company_Desc: z.string().min(1, "Company description is required"),
    company_Email: z
        .string()
        .min(1, "Company Email is required")
        .email("Invalid email address"),
    company_Website: z
        .string()
        .url("Please enter a valid https url.")
        .optional()
        .or(z.literal("")),
    company_Province: z.string().min(1, "Select a province."),
    company_City: z.string().min(1, "Select a province first."),
    company_Barangay: z.string().optional(),
    company_Industry: z
        .array(z.string())
        .refine((value) => value.some((item) => item), {
            message: "You have to select at least one industry.",
        }),
    company_Logo: z.union([
        z.string(),
        z
            .any()
            .refine((val) => val instanceof File, "Company logo is required.")
            .refine(
                (file) => file.size <= MAX_FILE_SIZE,
                `Max file size is 5mb`
            )
            .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
                message: "Please choose a supported format.",
            }),
    ]),
    company_NumEmployee: z.string().min(1, "Number of employees is required"),
    userId: z.string().optional(),
});
