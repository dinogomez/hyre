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
    <div className="z-50 relative">
      <Card>
        <CardHeader className="space-y-1 text-right p-3">
          <CardTitle className="absolute -top-5 -right-5 w-12 h-12 text-xs rounded-full flex  font-mono text-white bg-rose-700 justify-center items-center">
            <span className="flex items-center justify-center h-full m-0 p-0 select-none">
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
