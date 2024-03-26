import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const jobTypeEnum = pgEnum("jobtype", [
    "Full-Time",
    "Contract",
    "Intern",
]);

export const workArrangementEnum = pgEnum("workarrangement", [
    "Onsite",
    "Hybrid",
    "Remote",
]);

export const userTable = pgTable("user", {
    id: text("id").primaryKey(),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`),
    firstName: text("firstName"),
    lastName: text("lastName"),
    email: text("email").unique(),
    password: text("password"),
    skills: text("skills").array(),
    profilePicture: text("profilePicture"),
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
    title: text("Title"),
    desc: text("desc"),
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
