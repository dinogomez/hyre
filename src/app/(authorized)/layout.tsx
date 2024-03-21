import type { Metadata } from "next";
import { BriefcaseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUser } from "@/lib/auth";
import DashboardHeader from "./_components/dashboard-header";

export const metadata: Metadata = {
    title: "Horizon",
    description: "Horizon: Human Resource Information System",
    icons: {
        icon: "/favicon.ico",
    },
};

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user } = await getUser();

    return (
        <div className="flex min-h-screen w-screen flex-col ">
            <DashboardHeader user={user} />
            <div className="flex w-full  flex-1 flex-col-reverse   md:flex-row">
                <div className="h-28 w-full  border-t   md:h-auto md:w-28  md:border-r md:border-t-0">
                    <div className="mx-auto  flex  h-full max-w-md justify-center gap-3  md:mt-4 md:h-min md:flex-col md:justify-normal">
                        <Link
                            className="m-2 flex flex-col items-center justify-center space-y-1 rounded-md  px-5 font-mono text-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground md:py-3"
                            href="#"
                        >
                            <BriefcaseIcon className="h-6 w-6" />
                            <span>Jobs</span>
                        </Link>
                    </div>
                </div>
                <div className="h-auto w-full flex-1 ">{children}</div>
            </div>
        </div>
    );
}

{
    /* <div className="h-28 w-full  border-t  bg-blue-500 md:h-full md:w-min  md:border-r md:border-t-0">
<div className="mx-auto  flex  h-full max-w-md justify-center gap-3  md:mt-4 md:h-min md:flex-col md:justify-normal">
    <Link
        className="m-2 flex flex-col items-center justify-center space-y-1 rounded-md  px-5 font-mono text-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground md:py-3"
        href="#"
    >
        <BriefcaseIcon className="h-6 w-6" />
        <span>Jobs</span>
    </Link>
</div>
</div>
<div className="h-full w-full flex-1 bg-red-500">
{children}
</div> */
}
