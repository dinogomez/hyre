import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import {
    BuildQueryResult,
    DBQueryConfig,
    ExtractTablesWithRelations,
    InferSelectModel,
    relations,
    sql,
} from "drizzle-orm";
import {
    jobTypeEnum as jte,
    workArrangementEnum as wae,
} from "@/lib/data/data.enum";

import * as schema from "@/lib/schema/drizzle/drizzle.schema";
import { JobSchema } from "../zod/job.schema";

type Schema = typeof schema;

type TSchema = ExtractTablesWithRelations<Schema>;

export type IncludeRelation<TableName extends keyof TSchema> = DBQueryConfig<
    "one" | "many",
    boolean,
    TSchema,
    TSchema[TableName]
>["with"];

export type InferResultType<
    TableName extends keyof TSchema,
    With extends IncludeRelation<TableName> | undefined = undefined,
> = BuildQueryResult<
    TSchema,
    TSchema[TableName],
    {
        with: With;
    }
>;

export type CompaniesWithJobs = InferResultType<
    "company",
    {
        jobs: true;
    }
>;

export const jobTypeEnum = pgEnum("jobtype", jte);

export const workArrangementEnum = pgEnum("workarrangement", wae);

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`),
    firstName: text("firstName"),
    lastName: text("lastName"),
    email: text("email").unique(),
    password: text("password"),
    skills: text("skills").array(),
    avatar: text("avatar"),
});

export const company = pgTable("company", {
    id: text("id").primaryKey(),
    createdAt: timestamp("createdAt")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    company_Name: text("company_Name").notNull(),
    company_Header: text("company_Header").notNull(),
    company_Desc: text("company_Desc").notNull(),
    company_Email: text("company_Email").unique(),
    company_Website: text("company_Website"),
    company_Province: text("company_Province").notNull(),
    company_City: text("company_City").notNull(),
    company_Barangay: text("company_Barangay"),
    company_Industry: text("company_Industry").array().notNull(),
    company_Logo: text("company_Logo").notNull(),
    company_NumEmployee: text("company_NumEmployee").notNull(),
    userId: text("userId")
        .notNull()
        .references(() => user.id),
});

export const companyRelations = relations(company, ({ many }) => ({
    jobs: many(job),
}));

export const job = pgTable("job", {
    id: text("id").primaryKey(),
    createdAt: timestamp("createdAt")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    job_Title: text("job_Title").notNull(),
    job_Desc: text("job_Desc").notNull(),
    job_Type: jobTypeEnum("job_Type").notNull(),
    job_WorkArrangement: workArrangementEnum("job_WorkArrangement").notNull(),
    job_YearsExp: text("job_YearsExp").notNull(),
    job_Skills: text("job_Skills").array().notNull(),
    job_SalaryMin: integer("job_SalaryMin").notNull(),
    job_SalaryMax: integer("job_SalaryMax").notNull(),
    job_Province: text("job_Province").notNull(),
    job_City: text("job_City").notNull(),
    job_Barangay: text("job_Barangay"),
    job_PrimaryEmail: text("job_PrimaryEmail").notNull(),
    job_SecondaryEmail: text("job_SecondaryEmail"),
    job_RedirectUrl: text("job_RedirectUrl"),
    userId: text("userId")
        .notNull()
        .references(() => user.id),
    companyId: text("companyId")
        .notNull()
        .references(() => company.id),
});

export const jobRelations = relations(job, ({ one }) => ({
    company: one(company, {
        fields: [job.companyId],
        references: [company.id],
    }),
}));

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date",
    }).notNull(),
});

export type Company = InferSelectModel<typeof company>;
export type Job = InferSelectModel<typeof job>;
