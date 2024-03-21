"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
function DashboardButton() {
    const pathname = usePathname();

    return (
        <div>
            {pathname === "/" && (
                <Link href="/dashboard">
                    <Button variant="outline">Dashboard</Button>
                </Link>
            )}
        </div>
    );
}

export default DashboardButton;
