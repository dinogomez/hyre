"use server";
import { generateId } from "lucia";
import db from "../db";
import { jobTable } from "../schema/drizzle/drizzle.schema";
import { JobSchema } from "../schema/zod/job.schema";
import { z } from "zod";

export const createJobAction = async (
    values: z.infer<typeof JobSchema> & { companyId: string; userId: string }
) => {
    const status = JobSchema.safeParse(values);
    if (!status.success) {
        return { error: status.error.message };
    }

    console.log(values);

    const {
        job_Title,
        job_Desc,
        job_Type,
        job_WorkArrangement,
        job_YearsExp,
        job_Skills,
        job_Province,
        job_City,
        job_Barangay,
        job_PrimaryEmail,
        job_SecondaryEmail,
        job_RedirectUrl,
        companyId,
        userId,
    } = values;

    const jobId = generateId(15);

    try {
        await db.insert(jobTable).values({
            id: jobId,
            job_Title: job_Title,
            job_Desc: job_Desc,
            job_Type: job_Type,
            job_WorkArrangement: job_WorkArrangement,
            job_YearsExp: job_YearsExp,
            job_Skills: job_Skills,
            job_Province: job_Province,
            job_City: job_City,
            job_Barangay: job_Barangay,
            job_PrimaryEmail: job_PrimaryEmail,
            job_SecondaryEmail: job_SecondaryEmail,
            job_RedirectUrl: job_RedirectUrl,
            userId: userId!,
            companyId: companyId!,
        });
        return { success: true };
    } catch (error: any) {
        return { error: "There was a problem creating the Job." };
    }
};
