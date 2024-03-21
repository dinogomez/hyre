import Image from "next/image";
import Link from "next/link";
import AuthSign from "@/components/auth/auth.sign";
import { User } from "lucia";
import { motion } from "framer-motion";
import Logo from "@/components/logo";

interface HeaderProps {
    user: User | null;
}

async function Header({ user }: HeaderProps) {
    return (
        <nav className="container top-0 z-50  border-b p-0">
            <div className=" mt-5 flex flex-col flex-wrap items-center justify-between  px-5 sm:mt-0 sm:flex-row">
                <Link
                    href="/"
                    className="title-font mb-4 ml-4 flex  items-center font-medium md:mb-0"
                >
                    <Logo />
                </Link>

                <AuthSign user={user} />
            </div>
        </nav>
    );
}

export default Header;
