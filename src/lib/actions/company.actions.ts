"use server";
import { z } from "zod";
import { CompanySchema } from "../schema/zod/company.schema";
import { convertBase64ToBuffer, getImageExtension } from "../utils";
import { companyTable } from "../schema/drizzle/drizzle.schema";
import { generateId } from "lucia";
import db from "../db";
import supabase from "../db/supabase";

export const createCompanyAction = async (
    values: z.infer<typeof CompanySchema>
) => {
    const status = CompanySchema.safeParse(values);
    if (!status.success) {
        return { error: status.error.message };
    }

    const {
        company_Name,
        company_Desc,
        company_Email,
        company_Website,
        company_Province,
        company_City,
        company_Barangay,
        company_Industry,
        company_NumEmployee,
        company_Logo,
    } = values;

    const logo = company_Logo as string;
    const ext = logo.substring("data:image/".length, logo.indexOf(";base64"));
    const imageBase64Str = logo.replace(/^.+,/, "");
    const buf = Buffer.from(imageBase64Str, "base64");
    const logoKey = `${company_Name}/logo.${ext}`;
    const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(logoKey, buf, { contentType: `image/${ext}`, upsert: true });

    if (uploadError) {
        return { error: uploadError.message };
    }

    const companyId = generateId(15);

    try {
        const res = await db
            .insert(companyTable)
            .values({
                id: companyId,
                company_Name: company_Name,
                company_Desc: company_Desc,
                company_Email: company_Email,
                company_Website: company_Website,
                company_Province: company_Province,
                company_City: company_City,
                company_Barangay: company_Barangay,
                company_Industry: company_Industry,
                company_Logo: `avatars/${logoKey}`,
                company_NumEmployee: company_NumEmployee,
                userId: values.userId!,
            })
            .returning({
                id: companyTable.id,
            });
        return {
            success: "Company created successfully",
            companyId: res[0].id,
        };
    } catch (error: any) {
        return { error: "There was a problem creating the Company." };
    }
};
