import Link from "next/link";
import AuthSign from "@/components/auth/auth.sign";
import { User } from "lucia";
import Logo from "@/components/logo";
import DashboardHeaderSheet from "./dashboard.header-sheet";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
    user: User | null;
}

async function DashboardHeader({ user }: DashboardHeaderProps) {
    return (
        <nav className=" items-center border-b">
            <div className="container top-0 z-50  p-0">
                <div className=" flex items-center justify-between px-5">
                    <Link href="/dashboard">
                        <Logo />
                    </Link>
                    <DashboardHeaderSheet />
                    <div className="hidden items-center md:flex">
                        <Link href="/dashboard/recruit">
                            <Button variant="highlight">Post a Job</Button>
                        </Link>
                        <AuthSign user={user} />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default DashboardHeader;
