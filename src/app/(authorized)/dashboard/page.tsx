import { getCompaniesLJJobs } from "@/lib/actions/company.actions";
import { getUser } from "@/lib/auth";
import { getFullName } from "@/lib/utils";
import { Interweave } from "interweave";
import { Markup } from "interweave";
import { polyfill } from "interweave-ssr";

import { redirect } from "next/navigation";
import React from "react";
import DashboardCompanyCard from "./_components/dashboard.company-card";

async function Dashboard() {
    const { user } = await getUser();
    if (!user) {
        return redirect("/");
    }
    const { error, success } = await getCompaniesLJJobs();
    polyfill();
    return (
        <div className="h-full w-full  text-2xl">
            <div className="m-5 flex flex-col gap-y-4  p-5">
                {success &&
                    success.map(({ company, job }) => (
                        <DashboardCompanyCard
                            key={company.id}
                            company={company}
                            job={job}
                        />
                    ))}{" "}
                {error && error}
            </div>
        </div>
    );
}
export default Dashboard;
