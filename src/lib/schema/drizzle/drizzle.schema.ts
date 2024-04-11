import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import {
    jobTypeEnum as jte,
    workArrangementEnum as wae,
} from "@/lib/data/data.enum";

export const jobTypeEnum = pgEnum("jobtype", jte);

export const workArrangementEnum = pgEnum("workarrangement", wae);

export const userTable = pgTable("user", {
    id: text("id").primaryKey(),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`),
    firstName: text("firstName"),
    lastName: text("lastName"),
    email: text("email").unique(),
    password: text("password"),
    skills: text("skills").array(),
    avatar: text("avatar"),
});

export const companyTable = pgTable("company", {
    id: text("id").primaryKey(),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`),
    company_Name: text("company_Name"),
    company_Desc: text("company_Desc"),
    company_Email: text("company_Email").unique(),
    company_Website: text("company_Website"),
    company_Province: text("company_Province"),
    company_City: text("company_City"),
    company_Barangay: text("company_Barangay"),
    company_Industry: text("company_Industry").array(),
    company_Logo: text("company_Logo"),
    company_NumEmployee: text("company_NumEmployee"),
    userId: text("userId")
        .notNull()
        .references(() => userTable.id),
});

export const jobTable = pgTable("job", {
    id: text("id").primaryKey(),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`),
    job_Title: text("job_Title"),
    job_Desc: text("job_Desc"),
    job_Type: jobTypeEnum("job_Type"),
    job_WorkArrangement: workArrangementEnum("job_WorkArrangement"),
    job_YearsExp: integer("job_YearsExp"),
    job_Skills: text("job_Skills").array(),
    job_Province: text("job_Province"),
    job_City: text("job_City"),
    job_Barangay: text("job_Barangay"),
    job_primaryEmail: text("job_primaryEmail"),
    job_SecondaryEmail: text("job_SecondaryEmail"),
    job_RedirectUrl: text("job_RedirectUrl"),
    userId: text("userId")
        .notNull()
        .references(() => userTable.id),
    companyId: text("companyId")
        .notNull()
        .references(() => companyTable.id),
});

export const sessionTable = pgTable("session", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date",
    }).notNull(),
});
