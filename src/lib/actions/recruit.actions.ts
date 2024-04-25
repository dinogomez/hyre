"use server";
import { z } from "zod";
import { MergeSchema } from "../schema/zod/merge.schema";
import { createCompanyAction } from "./company.actions";
import { createJobAction } from "./job.actions";

export const recruitAction = async (values: z.infer<typeof MergeSchema>) => {
    const status = MergeSchema.safeParse(values);
    if (!status.success) {
        return { error: status.error.message };
    }

    const {
        job_Title,
        job_Desc,
        job_Type,
        job_WorkArrangement,
        job_YearsExp,
        job_SalaryMin,
        job_SalaryMax,
        job_Skills,
        job_Province,
        job_City,
        job_Barangay,
        job_PrimaryEmail,
        job_SecondaryEmail,
        job_RedirectUrl,
        company_Name,
        company_Header,
        company_Desc,
        company_Email,
        company_Website,
        company_Province,
        company_City,
        company_Barangay,
        company_Industry,
        company_NumEmployee,
        company_Logo,
        userId,
    } = values;

    const companyResponse = await createCompanyAction({
        company_Name,
        company_Desc,
        company_Header,
        company_Email,
        company_Website,
        company_Province,
        company_City,
        company_Barangay,
        company_Industry,
        company_NumEmployee,
        company_Logo,
        userId,
    });

    if (companyResponse.error) {
        return { error: companyResponse.error };
    }

    const { companyId } = companyResponse;

    const jobResponse = await createJobAction({
        job_Title,
        job_Desc,
        job_Type,
        job_WorkArrangement,
        job_YearsExp,
        job_SalaryMin,
        job_SalaryMax,
        job_Skills,
        job_Province,
        job_City,
        job_Barangay,
        job_PrimaryEmail,
        job_SecondaryEmail,
        job_RedirectUrl,
        userId: userId!,
        companyId: companyId!,
    });

    if (jobResponse.error) {
        return { error: companyResponse.error };
    }

    return {
        success: `${company_Name} , ${job_Title}`,
    };
};
