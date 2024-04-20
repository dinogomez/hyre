import { jobTypeEnum, workArrangementEnum } from "@/lib/data/data.enum";
import { z } from "zod";

const SalaryRangeSchema = z.object({
    salaryRangeMin: z.number().positive(),
    salaryRangeMax: z
        .number()
        .positive()
        .refine(
            (salaryRangeMax) =>
                salaryRangeMax.input >
                salaryRangeMax.getSibling("salaryRangeMin").input,
            {
                message:
                    "Salary range max must be greater than salary range min",
                path: ["salaryRangeMax"],
            }
        ),
});
export const JobSchema = z.object({
    job_Title: z.string().min(1, "Job title is required"),
    job_Desc: z.string().min(1, "Job description is required"),
    job_Type: z.enum(jobTypeEnum, {
        errorMap: (issue, ctx) => ({ message: "Please select a job type" }),
    }),
    job_WorkArrangement: z.enum(workArrangementEnum, {
        errorMap: (issue, ctx) => ({
            message: "Please select a work arrangement",
        }),
    }),
    job_SalaryRange: z.object({
        salaryRangeMin: z.number().positive(),
        salaryRangeMax: z
            .number()
            .positive()
            .refine((val, ctx) => val > ctx.parent.salaryRangeMin, {
                message: "salaryRangeMax must be greater than salaryRangeMin",
                path: ["salaryRangeMax"],
            }),
    }),
    job_YearsExp: z.string().min(1, "Years of experience is required."),
    job_Skills: z
        .array(z.string())
        .refine((value) => value.some((item) => item), {
            message: "You have to select at least one skill requirement.",
        }),
    job_Province: z.string().min(1, "Select a region first."),
    job_City: z.string().min(1, "Select a province first."),
    job_Barangay: z.string(),
    job_PrimaryEmail: z
        .string()
        .min(1, "Contact Email is required")
        .email("Invalid email address"),
    job_SecondaryEmail: z
        .string()
        .email("Invalid email address")
        .optional()
        .or(z.literal("")),
    job_RedirectUrl: z
        .string()
        .url("Please enter a valid https url.")
        .optional()
        .or(z.literal("")),
    userId: z.string().optional(),
    companyId: z.string().optional(),
});
