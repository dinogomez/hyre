import { jobTypeEnum, workArrangementEnum } from "@/lib/data/data.enum";
import { z } from "zod";
import { CompanySchema } from "./company.schema";
import { JobSchema } from "./job.schema";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const MergeSchema = z.intersection(CompanySchema, JobSchema);
