import { Link } from "next-view-transitions";
import { User } from "lucia";
import Logo from "@/components/logo";
import DashboardHeaderSheet from "./dashboard.header-sheet";
import { Button } from "@/components/ui/button";
import UserAvatarDropdown from "@/components/user/user.avatar-dropdown";

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
                    <div className=" my-4 flex items-center">
                        <div className="hidden items-center space-x-4 md:flex">
                            <Link href="/dashboard/recruit">
                                <Button
                                    size="lg"
                                    variant="highlight"
                                    className="text-lg"
                                >
                                    Post a Job
                                </Button>
                            </Link>
                            <UserAvatarDropdown />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default DashboardHeader;
