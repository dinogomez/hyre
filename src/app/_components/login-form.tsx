"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function LoginForm() {
    return (
        <div className="relative z-50">
            <Card>
                <CardHeader className="space-y-1 p-3 text-right">
                    <CardTitle className="absolute -right-5 -top-5 flex h-12 w-12 items-center justify-center  rounded-full bg-rose-700 font-mono text-xs text-white">
                        <span className="m-0 flex h-full select-none items-center justify-center p-0">
                            gt
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="relative">
                        <div className="relative flex justify-center text-xs uppercase"></div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Username</Label>
                        <Input id="email" type="email" placeholder="" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full ">Login</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
