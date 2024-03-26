import React from "react";
import RecruitForm from "./_components/recruit.form";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

async function RecruitNew() {
    const { user } = await getUser();
    if (!user) {
        return redirect("/");
    }
    return (
        <div className="container">
            <RecruitForm />
        </div>
    );
}

export default RecruitNew;
