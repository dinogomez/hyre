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
});
