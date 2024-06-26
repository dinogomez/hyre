"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignUpSchema } from "@/lib/schema/zod/signup.schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../ui/form";
import { signUp } from "@/lib/actions/auth.actions";
import { toast } from "@/components/ui/use-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Link } from "next-view-transitions";

type SignUpSchemaValues = z.infer<typeof SignUpSchema>;

interface SignUpProps {
    label: string;
    ghost?: boolean;
}

function SignUp({ label, ghost = false }: SignUpProps) {
    const router = useRouter();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirm: "",
            // skills: [],
        },
    });

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }
    async function onSubmit(values: SignUpSchemaValues) {
        const res = await signUp(values);
        if (res.error) {
            toast({
                variant: "destructive",
                description: res.error,
            });
        } else {
            toast({
                variant: "default",
                description: "Account created successfully",
            });

            router.push("/dashboard");
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {ghost ? (
                    <h1 className="cursor-pointer font-bold text-primary">
                        {label}
                    </h1>
                ) : (
                    <Button size="lg" className=" text-base font-bold">
                        {label}
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="ml-1 h-4 w-4"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] ">
                <DialogHeader className="">
                    <DialogTitle>Create your account</DialogTitle>
                    <DialogDescription>Applicant Form</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="">
                        <div className="grid gap-4 py-4">
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="First Name"
                                                        className="w-full border px-3 py-2"
                                                        type="text"
                                                        autoComplete="off"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex-1">
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Last Name"
                                                        className="w-full border px-3 py-2"
                                                        type="text"
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
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
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
                                            <FormItem>
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
                                                            {...field}
                                                        />
                                                        <button
                                                            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                togglePasswordVisibility();
                                                            }}
                                                        >
                                                            {isPasswordVisible ? (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={
                                                                        1.5
                                                                    }
                                                                    stroke="currentColor"
                                                                    className="h-5 w-5"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                                                    />
                                                                </svg>
                                                            ) : (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={
                                                                        1.5
                                                                    }
                                                                    stroke="currentColor"
                                                                    className="h-5 w-5"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                                    />
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                    />
                                                                </svg>
                                                            )}
                                                        </button>
                                                    </div>
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
                                        name="confirm"
                                        render={({ field }) => (
                                            <FormItem className="h-15">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Confirm Password"
                                                        className="w-full border px-3 py-2"
                                                        type={
                                                            isPasswordVisible
                                                                ? "text"
                                                                : "password"
                                                        }
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
                            {/* <div className="grid w-full  items-center gap-3 mb-5">
                <FormField
                  control={form.control}
                  name="skills"
                  render={() => (
                    <FormItem className="h-40">
                      <div className="mb-4">
                        <FormLabel className="">Skills</FormLabel>
                        <FormDescription className="">
                          Select your proficiencies
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-3 gap-3 ">
                        {Skills.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="skills"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0 "
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel>{item.label}</FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div> */}
                        </div>

                        <Button className="w-full" type="submit">
                            Sign Up
                        </Button>
                    </form>
                </Form>

                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    By joining, you agree to our
                    <Link
                        href=""
                        className=" flex items-center font-bold hover:text-primary"
                    >
                        Terms of Service{" "}
                        <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                    and
                    <Link
                        href=""
                        className=" flex items-center font-bold hover:text-primary"
                    >
                        Privacy Policy <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default SignUp;
