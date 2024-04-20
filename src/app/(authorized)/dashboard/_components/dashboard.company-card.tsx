import { ChevronRight, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Company, Job } from "@/lib/schema/drizzle/drizzle.schema";
import {
    getInitials,
    getRemoteImage,
    getFirstSentence,
    getLabelById,
    getTimeDifference,
} from "@/lib/utils";
import Image from "next/image";
import { numberOfEmployee } from "@/lib/data/data.number-employees";

interface DashboardCompanyCardProps {
    company: Company;
    job: Job | null;
}

function DashboardCompanyCard({ company, job }: DashboardCompanyCardProps) {
    const initials = getInitials(company.company_Name);

    return (
        <div className="mx-auto w-8/12 rounded-lg bg-white p-4 shadow-xl">
            <div className="flex items-center space-x-4">
                <Image
                    priority
                    src={
                        company.company_Logo
                            ? getRemoteImage(company.company_Logo)
                            : "/200x200.svg"
                    }
                    className="h-12 w-12 rounded-sm  bg-background "
                    width={128}
                    height={128}
                    alt="Logo"
                />

                <div className="flex flex-col gap-y-1">
                    <span className="font-semibold">
                        {company.company_Name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                        {getFirstSentence(company.company_Desc)}
                    </span>
                    <span className="flex items-center  text-sm font-bold text-neutral-500">
                        <UsersRound className="mr-2 h-4 w-4" />
                        {getLabelById(
                            numberOfEmployee,
                            company.company_NumEmployee
                        )}{" "}
                        EMPLOYEES
                    </span>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <Badge variant="success">ACTIVELY HIRING</Badge>
                <div className="flex items-center space-x-2">
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
            </div>
            <div className="mt-4 rounded-md border p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold">{job?.job_Title}</h3>
                        <p className="text-sm text-gray-500">
                            {job?.job_Province}, {job?.job_City} ·{" "}
                            {job?.job_WorkArrangement} · ₹3L – ₹5L
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Badge>RECRUITER RECENTLY ACTIVE</Badge>
                        <span className="text-sm text-gray-500">
                            {getTimeDifference(job!.createdAt)}
                        </span>
                    </div>
                </div>
                {/* <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="outline">Save</Button>
                    <Button>Learn more</Button>
                </div> */}
            </div>
            {/* <div className="mt-4 flex items-center justify-between">
                <div className="flex space-x-4">
                    <Button className="text-gray-500" variant="ghost">
                        Report
                    </Button>
                    <Button className="text-gray-500" variant="ghost">
                        Hide
                    </Button>
                </div>
                <div className="flex items-center space-x-2">
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
            </div> */}
        </div>
    );
}

export default DashboardCompanyCard;
