import Link from "next/link";
import AuthSign from "@/components/auth/auth.sign";
import { User } from "lucia";
import Logo from "@/components/logo";

interface HeaderProps {
    user: User | null;
}

async function Header({ user }: HeaderProps) {
    return (
        <nav className="border-b">
            <div className=" container top-0  z-50 p-0">
                <div className=" flex  items-center  justify-between px-5">
                    <Link href="/">
                        <Logo />
                    </Link>
                    <AuthSign user={user} />
                </div>
            </div>
        </nav>
    );
}

export default Header;
