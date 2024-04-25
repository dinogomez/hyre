import type { Metadata } from "next";
import { getUser } from "@/lib/auth";
import DashboardHeader from "./_components/dashboard.header";
import { redirect } from "next/navigation";
import Loading from "@/app/loading";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Hyre",
    description: "Hyre: Find Careers",
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

    if (!user) {
        return redirect("/");
    }

    return (
        <div className="flex min-h-screen w-screen flex-col ">
            <DashboardHeader user={user} />
            <div className="flex w-full flex-1 flex-col-reverse md:flex-row">
                <div className="h-auto w-full flex-1 ">
                    <Suspense fallback={<Loading />}>{children}</Suspense>
                </div>
            </div>
        </div>
    );
}

{
    /* <div className="flex w-full  flex-1 flex-col-reverse   md:flex-row">
                <div className="h-28 w-full  border-t  md:h-auto md:w-28  md:border-t-0">
                    <div className="mx-auto  flex  h-full max-w-md justify-center gap-3  md:mt-4 md:h-min md:flex-col md:justify-normal">
                        <Link
                            className="m-2 flex flex-col items-center justify-center space-y-1 rounded-md  px-5 font-mono text-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground md:py-3"
                            href="/dashboard"
                        >
                            <HomeIcon className="h-6 w-6" />
                            <span>Home</span>
                        </Link>

                        <Link
                            className="m-2 flex flex-col items-center justify-center space-y-1 rounded-md  px-5 font-mono text-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground md:py-3"
                            href="/dashboard/jobs"
                        >
                            <BriefcaseIcon className="h-6 w-6" />
                            <span>Jobs</span>
                        </Link>
                    </div>
                </div>
                <div className="h-auto w-full flex-1 ">{children}</div>
            </div> */
}
