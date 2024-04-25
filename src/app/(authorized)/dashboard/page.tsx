import { getCompaniesLJJobs } from "@/lib/actions/company.actions";
import { getUser } from "@/lib/auth";
import { getFullName } from "@/lib/utils";
import { Interweave } from "interweave";
import { Markup } from "interweave";
import { polyfill } from "interweave-ssr";

import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import DashboardCompanyCard from "./_components/dashboard.company-card";
import Loading from "@/app/loading";
import { CompaniesWithJobs } from "@/lib/schema/drizzle/drizzle.schema";

async function Dashboard() {
    const { user } = await getUser();
    if (!user) {
        return redirect("/");
    }
    const { error, success } = await getCompaniesLJJobs();
    polyfill();
    return (
        <Suspense fallback={<Loading />}>
            <div className="h-full w-full  text-2xl">
                <div className="m-5 flex flex-col gap-y-4  p-5">
                    {success &&
                        success.map((data: CompaniesWithJobs) => (
                            <DashboardCompanyCard key={data.id} data={data} />
                        ))}
                    {error && error}
                </div>
            </div>
        </Suspense>
    );
}
export default Dashboard;
