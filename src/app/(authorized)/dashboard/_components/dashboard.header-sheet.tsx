import React from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import Logo from "@/components/logo";

function DashboardHeaderSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="my-4 shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold"
                    >
                        <Link href="/">
                            <Logo />
                        </Link>
                        <span className="sr-only">Hyve</span>
                    </Link>
                    <Link href="#" className="hover:text-foreground">
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
    );
}

export default DashboardHeaderSheet;
