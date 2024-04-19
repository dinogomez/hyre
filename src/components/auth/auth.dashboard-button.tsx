"use client";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import { Button } from "../ui/button";
function DashboardButton() {
    const pathname = usePathname();

    return (
        <div>
            {pathname === "/" && (
                <Link href="/dashboard">
                    <Button variant="outline" size="lg" className="text-lg">
                        Dashboard
                    </Button>
                </Link>
            )}
        </div>
    );
}

export default DashboardButton;
