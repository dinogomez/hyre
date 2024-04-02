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
    companyName: text("companyName"),
    companyDesc: text("companyDesc"),
    companyEmail: text("companyEmail").unique(),
    website: text("website"),
    province: text("province"),
    city: text("city"),
    barangay: text("barangay"),
    industry: text("industry").array(),
    companyLogo: text("companyLogo"),
    numEmployee: text("numEmployee"),
    userId: text("userId")
        .notNull()
        .references(() => userTable.id),
});

export const jobTable = pgTable("job", {
    id: text("id").primaryKey(),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`),
    jobTitle: text("jobTitle"),
    jobDesc: text("jobDesc"),
    jobType: jobTypeEnum("jobTypeEnum"),
    workArrangement: workArrangementEnum("workArrangementEnum"),
    yearsExp: integer("yearsExp"),
    skills: text("skills").array(),
    jProvince: text("province"),
    jCity: text("city"),
    jBarangay: text("barangay"),
    primaryEmail: text("primaryEmail"),
    secondaryEmail: text("secondaryEmail"),
    redirectUrl: text("redirectUrl"),
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
