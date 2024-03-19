"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
function DashboardButton() {
    const pathname = usePathname();

    return (
        <div>
            {pathname === "/" && (
                <Link href="/dashboard">
                    <h1 className="cursor-pointer font-bold decoration-4 underline-offset-8 hover:underline hover:decoration-purple-600">
                        Dashboard
                    </h1>
                </Link>
            )}
        </div>
    );
}

export default DashboardButton;
