"use server";
import { z } from "zod";
import { SignInSchema, SignUpSchema } from "../schema/zod/signup.schema";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import db from "../db";
import { userTable } from "../schema/drizzle/drizzle.schema";
import { getUser, lucia } from "../auth";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
    const status = SignUpSchema.safeParse(values);
    const { password, ...iValues } = values;

    if (!status.success) {
        return { error: "Invalid Fields" };
    }
    const hashedPassword = await new Argon2id().hash(values.password);

    console.log(hashedPassword);
    const userId = generateId(15);

    try {
        await db
            .insert(userTable)
            .values({
                id: userId,
                password: hashedPassword,
                ...iValues,
            })
            .returning({
                id: userTable.id,
                email: userTable.email,
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
    const existUser = await db.query.userTable.findFirst({
        where: (table) => eq(table.email, values.email),
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

    const session = await lucia.createSession(existUser.id, {
        expiresIn: 60 * 60 * 24,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );

    return {
        success: "Launching Horizon!",
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
