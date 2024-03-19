"use client";
import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
    Dialog,
    DialogContent,
    DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { SignInSchema } from "@/lib/schema/zod/signup.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { signIn } from "@/lib/actions/auth.actions";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import SignUp from "./auth.signup";
import { AlertTriangleIcon } from "lucide-react";
import { useTransition } from "react";

type SignInSchemaValues = z.infer<typeof SignInSchema>;

interface SignInProps {
    label: string;
}

function SignIn({ label }: SignInProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: SignInSchemaValues) {
        startTransition(async () => {
            const res = await signIn(values);
            if (res.error) {
                toast({
                    variant: "destructive",
                    description: (
                        <div className="flex items-center gap-x-2">
                            <AlertTriangleIcon className="h-4 w-4" />
                            {res.error}
                        </div>
                    ),
                });
            } else {
                toast({
                    variant: "default",
                    description: res.success,
                });

                router.push("/dashboard");
            }
        });
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <h1 className="cursor-pointer font-bold decoration-4 underline-offset-8 hover:underline hover:decoration-purple-600">
                    {label}
                </h1>
            </DialogTrigger>
            <DialogContent className="s sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                    <DialogDescription>Search your horizon!</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="">
                        <div className="mb-4 grid gap-4 space-y-5 py-4">
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="h-12">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Email"
                                                        className="w-full border px-3 py-2"
                                                        type="email"
                                                        autoComplete="off"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="h-12">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Password"
                                                        className="w-full border px-3 py-2"
                                                        type="password"
                                                        autoComplete="off"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <Button
                            disabled={isPending}
                            className="w-full"
                            type="submit"
                        >
                            {isPending ? (
                                <div className="flex items-center gap-2">
                                    <svg
                                        aria-hidden="true"
                                        className="h-5 w-5 animate-spin fill-slate-400  text-white"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>{" "}
                                    Signing In
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>
                </Form>
                <div className="flex justify-center gap-x-2 text-sm text-muted-foreground">
                    <div>No Account?</div>{" "}
                    <SignUp label="Create One" ghost={true} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default SignIn;
