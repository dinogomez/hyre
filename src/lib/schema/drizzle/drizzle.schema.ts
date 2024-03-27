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
    region: text("location"),
    province: text("location"),
    city: text("location"),
    barangay: text("location"),
    industry: text("industry").array(),
    companyLogo: text("companyLogo"),
    numEmployee: text("numEmployee"),
});

export const jobTable = pgTable("job", {
    id: text("id").primaryKey(),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`),
    jobTitle: text("Title"),
    jobDesc: text("desc"),
    jobType: jobTypeEnum("jobTypeEnum"),
    workArrangement: workArrangementEnum("workArrangementEnum"),
    yearsExp: integer("yearsExp"),
    skills: text("skills").array(),
    userContactId: text("userContactId")
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
