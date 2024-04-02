import { jobTypeEnum, workArrangementEnum } from "@/lib/data/data.enum";
import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const MergeSchema = z.object({
    jobTitle: z.string().min(1, "Job title is required"),
    jobDesc: z.string().min(1, "Job description is required"),
    jobType: z.enum(jobTypeEnum, {
        errorMap: (issue, ctx) => ({ message: "Please select a job type" }),
    }),
    workArrangement: z.enum(workArrangementEnum, {
        errorMap: (issue, ctx) => ({
            message: "Please select a work arrangement",
        }),
    }),
    yearsExp: z.string().min(1, "Years of experience is required."),
    skills: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one skill requirement.",
    }),
    jProvince: z.string().min(1, "Select a region first."),
    jCity: z.string().min(1, "Select a province first."),
    jBarangay: z.string(),
    primaryEmail: z
        .string()
        .min(1, "Contact Email is required")
        .email("Invalid email address"),
    secondaryEmail: z
        .string()
        .email("Invalid email address")
        .optional()
        .or(z.literal("")),
    redirectUrl: z
        .string()
        .url("Please enter a valid https url.")
        .optional()
        .or(z.literal("")),

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
    barangay: z.string().optional(),
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
        })
        .or(z.string()),

    numEmployee: z.string().min(1, "Number of employees is required"),
    userId: z.string().optional(),
});
