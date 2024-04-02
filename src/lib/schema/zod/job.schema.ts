import { jobTypeEnum, workArrangementEnum } from "@/lib/data/data.enum";
import { z } from "zod";

export const JobSchema = z.object({
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
    secondaryEmail: z.string().email("Invalid email address").optional(),
    redirectUrl: z
        .string()
        .url("Please enter a valid https url.")
        .optional()
        .or(z.literal("")),
});
