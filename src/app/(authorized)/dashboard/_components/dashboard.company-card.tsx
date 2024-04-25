import { ChevronRight, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    CompaniesWithJobs,
    Company,
    Job,
} from "@/lib/schema/drizzle/drizzle.schema";
import {
    getInitials,
    getRemoteImage,
    getFirstSentence,
    getLabelById,
    getTimeDifference,
} from "@/lib/utils";
import Image from "next/image";
import { numberOfEmployee } from "@/lib/data/data.number-employees";
import ImageLoading from "@/components/loading-image";
import { Suspense } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

function DashboardCompanyCard({ data }: { data: CompaniesWithJobs }) {
    const initials = getInitials(data.company_Name);

    return (
        <div className="mx-auto w-8/12 rounded-lg bg-white p-4 shadow-xl">
            <div className="flex items-center space-x-4">
                <Suspense fallback={<ImageLoading />}>
                    <div className="h-12 w-12">
                        <Image
                            priority
                            src={
                                data.company_Logo
                                    ? getRemoteImage(data.company_Logo)
                                    : "/200x200.svg"
                            }
                            className="rounded-sm bg-background  object-cover "
                            width={128}
                            height={128}
                            alt="Logo"
                        />
                    </div>
                </Suspense>

                <div className="flex flex-col gap-y-1">
                    <span className="font-semibold">{data.company_Name}</span>
                    <span className="text-sm text-muted-foreground">
                        {getFirstSentence(data.company_Desc)}
                    </span>
                    <span className="flex items-center  text-sm font-bold text-neutral-500">
                        <UsersRound className="mr-2 h-4 w-4" />
                        {getLabelById(
                            numberOfEmployee,
                            data.company_NumEmployee
                        )}{" "}
                        EMPLOYEES
                    </span>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <Badge variant="highlight">ACTIVELY HIRING</Badge>
                <div className="flex items-center space-x-2">
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
            </div>
            {data?.jobs?.map((job) => (
                <div key={job.id} className="mt-4 rounded-md border p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold">{job.job_Title}</h3>
                            <p className="text-sm text-gray-500">
                                {job.job_Province}, {job.job_City} ·{" "}
                                {job.job_WorkArrangement} · ₱{" "}
                                {job.job_SalaryMin} – ₱{job.job_SalaryMax}
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Badge variant="success">
                                RECRUITER RECENTLY ACTIVE
                            </Badge>
                            <span className="text-sm text-gray-500">
                                {job.createdAt
                                    ? getTimeDifference(job.createdAt)
                                    : "POSTED A WHILE AGO"}
                            </span>
                        </div>
                    </div>
                    {/* <div className="mt-4 flex justify-end space-x-2">
      <Button variant="outline">Save</Button>
      <Button>Learn more</Button>
    </div> */}
                </div>
            ))}
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
