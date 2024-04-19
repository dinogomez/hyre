"use client";
import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { SignInSchema } from "@/lib/schema/zod/signup.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { signIn } from "@/lib/actions/auth.actions";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SignUp from "@/components/auth/auth.signup";
import { AlertTriangleIcon, Eye, EyeOff } from "lucide-react";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "../ui/checkbox";
import { Link } from "next-view-transitions";

type SignInSchemaValues = z.infer<typeof SignInSchema>;

interface SignInProps {
    label: string;
}

function SignIn({ label }: SignInProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }
    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
            keepLogin: false,
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
                <Button
                    variant="outline"
                    size="lg"
                    className="text-base font-bold"
                >
                    {label}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <>
                    <DialogHeader className="mb-6">
                        <DialogTitle>Login</DialogTitle>
                        <DialogDescription>
                            Build your career with Hyze!
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className=""
                        >
                            <div className="mb-4 grid gap-3 space-y-2 ">
                                <div className="flex items-center">
                                    <div className="flex-1">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem className="">
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Email"
                                                            className="w-full border px-3 py-2 "
                                                            type="email"
                                                            autoComplete="off"
                                                            {...field}
                                                            onKeyDown={(e) => {
                                                                if (
                                                                    e.key ===
                                                                    "Enter"
                                                                ) {
                                                                    e.preventDefault();
                                                                    const passwordInput =
                                                                        document.querySelector(
                                                                            'input[name="password"]'
                                                                        );
                                                                    if (
                                                                        passwordInput &&
                                                                        passwordInput instanceof
                                                                            HTMLInputElement
                                                                    ) {
                                                                        passwordInput.focus();
                                                                    }
                                                                }
                                                            }}
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
                                                <FormItem className="">
                                                    <FormControl>
                                                        <div className="relative  mx-auto">
                                                            <Input
                                                                placeholder="Password"
                                                                className="w-full border px-3 py-2"
                                                                type={
                                                                    isPasswordVisible
                                                                        ? "text"
                                                                        : "password"
                                                                }
                                                                autoComplete="off"
                                                                onKeyDown={(
                                                                    e
                                                                ) => {
                                                                    if (
                                                                        e.key ===
                                                                        "Enter"
                                                                    ) {
                                                                        form.handleSubmit(
                                                                            onSubmit
                                                                        )(e);
                                                                    }
                                                                }}
                                                                {...field}
                                                            />
                                                            <Button
                                                                variant="ghost"
                                                                className="absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground hover:bg-transparent"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    togglePasswordVisibility();
                                                                }}
                                                            >
                                                                {isPasswordVisible ? (
                                                                    <Eye className="h-5 w-5 text-muted-foreground" />
                                                                ) : (
                                                                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                                                                )}
                                                            </Button>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center space-x-2">
                                        <FormField
                                            control={form.control}
                                            name="keepLogin"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                    <FormControl>
                                                        <Checkbox
                                                            className=""
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none tracking-tighter">
                                                        <FormLabel>
                                                            Keep Me Logged In
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Link
                                            href=""
                                            className="font-bold tracking-tighter text-black"
                                        >
                                            Forgot Password?
                                        </Link>
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
                                <div className="flex justify-center gap-x-1 text-sm text-muted-foreground">
                                    <div>No Account?</div>{" "}
                                    <DialogClose asChild>
                                        <SignUp
                                            label="Create One"
                                            ghost={true}
                                        />
                                    </DialogClose>
                                </div>
                            </div>
                        </form>
                    </Form>
                </>
            </DialogContent>
        </Dialog>
    );
}

export default SignIn;
