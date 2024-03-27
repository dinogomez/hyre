"use client";

import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth.actions";
import { ChevronDown } from "lucide-react";
import { useSession } from "../provider/session-provider";
import { getFullName, getInitials } from "@/lib/utils";

function UserAvatarDropdown() {
    const { user } = useSession();
    const fullName = getFullName(user!);
    const initials = getInitials(fullName);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                    <div className="justify-content flex items-center gap-2 ring-0">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                            <AvatarFallback className="bg-primary text-white">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <ChevronDown className="h-6 w-6" />
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-50 w-64" align="end" forceMount>
                <DropdownMenuLabel className="p-3 font-normal">
                    <div className="flex items-center space-x-3 space-y-1">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-1">
                            <p className="text-base font-medium leading-none">
                                {fullName}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user!.email}
                            </p>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem disabled className="text-xs">
                        Personal
                    </DropdownMenuItem>

                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled className="text-xs">
                    Support
                </DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <form action={signOut}>
                        <button className="w-full text-start">Sign Out</button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserAvatarDropdown;
