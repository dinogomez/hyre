"use client";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
function DashboardButton() {
  const pathname = usePathname();

  return (
    <div>
      {pathname === "/" && (
        <Link href="/dashboard">
          <h1 className="hover:underline cursor-pointer decoration-4 underline-offset-8 font-bold hover:decoration-purple-600">
            Dashboard
          </h1>
        </Link>
      )}
    </div>
  );
}

export default DashboardButton;
