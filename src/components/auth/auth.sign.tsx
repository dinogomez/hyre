import { getUser } from "@/lib/auth";
import React from "react";
import SignIn from "@/components/auth/auth.signin";
import SignUp from "@/components/auth/auth.signup";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth.actions";
import DashboardButton from "@/components/auth/auth.dashboard-button";
import UserAvatarDropdown from "../user/user.avatar-dropdown";
import { User } from "lucia";

interface AuthSignProps {
    user: User | null;
}

async function AuthSign({ user }: AuthSignProps) {
    return (
        <div className="z-50 flex items-center space-x-12 ">
            <div className=" my-4 flex items-center">
                <div className="flex flex-1 items-center justify-end ">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <DashboardButton />
                            <UserAvatarDropdown />
                        </div>
                    ) : (
                        <div className="flex items-center space-x-10">
                            <SignIn label="Login" />
                            <SignUp label="Post a Job" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthSign;
