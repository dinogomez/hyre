import Image from "next/image";
import Link from "next/link";
import { getUser } from "@/lib/auth";
import AuthSign from "@/components/auth/auth.sign";
import { User } from "lucia";
import Logo from "@/components/logo";
import { Menu, Package2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
    user: User | null;
}

async function DashboardHeader({ user }: DashboardHeaderProps) {
    return (
        <nav className=" items-center border-b">
            <div className="container top-0 z-50  p-0">
                <div className=" flex items-center justify-between px-5">
                    <Link href="/">
                        <Logo />
                    </Link>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="my-4 shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle navigation menu
                                </span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <Package2 className="h-6 w-6" />
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                <Link
                                    href="#"
                                    className="hover:text-foreground"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="#"
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    Orders
                                </Link>
                                <Link
                                    href="#"
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    Products
                                </Link>
                                <Link
                                    href="#"
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    Customers
                                </Link>
                                <Link
                                    href="#"
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    Analytics
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="hidden md:flex">
                        <AuthSign user={user} />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default DashboardHeader;
