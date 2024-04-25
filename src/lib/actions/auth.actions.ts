"use server";
import { z } from "zod";
import { SignInSchema, SignUpSchema } from "../schema/zod/signup.schema";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import db from "../db";
import { company, user } from "../schema/drizzle/drizzle.schema";
import { getUser, lucia } from "../auth";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { MergeSchema } from "../schema/zod/merge.schema";
import supabase from "../db/supabase";
import { convertBase64ToBuffer, getImageExtension } from "../utils";

export const recruitAction = async (values: z.infer<typeof MergeSchema>) => {
    const status = MergeSchema.safeParse(values);
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
        userId,
    } = values;
    const logo = company_Logo as string;
    const ext = getImageExtension(logo);
    const buf = convertBase64ToBuffer(logo);
    const logoKey = `${company_Name}/logo.${ext}`;

    const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(logoKey, buf, {
            contentType: `image/${ext}`,
            upsert: true,
        });

    if (uploadError) {
        return { error: uploadError.message };
    }
    const companyId = generateId(15);

    try {
        await db.insert(company).values({
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
        });

        return { success: "Company Insert Success" };
    } catch (error: any) {
        return { error: error.message };
    }
};

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
    const status = SignUpSchema.safeParse(values);
    const { password, email, ...iValues } = values;

    if (!status.success) {
        return { error: "Invalid Fields" };
    }
    const hashedPassword = await new Argon2id().hash(values.password);

    console.log(hashedPassword);
    const userId = generateId(15);

    try {
        await db
            .insert(user)
            .values({
                id: userId,
                password: hashedPassword,
                email: values.email.toLowerCase(),
                ...iValues,
            })
            .returning({
                id: user.id,
                email: user.email,
            });

        const session = await lucia.createSession(userId, {
            expiresIn: 60 * 60 * 24,
        });

        const sessionCookie = lucia.createSessionCookie(session.id);

        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );

        return { success: true, data: { userId } };
    } catch (error: any) {
        return { error: error.message };
    }
};

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
    const existUser = await db.query.user.findFirst({
        where: (table) => eq(table.email, values.email.toLocaleLowerCase()),
    });

    if (!existUser) {
        return {
            error: "Incorrect Credentials",
        };
    }
    if (!existUser.password) {
        return {
            error: "Incorrect Credentials",
        };
    }

    const isValidPassword = await new Argon2id().verify(
        existUser.password,
        values.password
    );

    if (!isValidPassword) {
        return {
            error: "Incorrect Credentials",
        };
    }

    const expiresIn = values.keepLogin ? 10 : 10;

    const session = await lucia.createSession(existUser.id, {
        expiresIn: expiresIn,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );

    return {
        success: "Signing In!",
    };
};

export const signOut = async () => {
    try {
        const { session } = await getUser();

        if (!session) {
            return {
                error: "User is not signed in",
            };
        }

        await lucia.invalidateSession(session.id);
        const sessionCookie = lucia.createBlankSessionCookie();

        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );
    } catch (error: any) {
        return {
            error: error?.message,
        };
    }
};
