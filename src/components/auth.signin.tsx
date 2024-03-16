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
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type SignInSchemaValues = z.infer<typeof SignInSchema>;

function SignIn() {
  const router = useRouter();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInSchemaValues) {
    const res = await signIn(values);
    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      });
    } else {
      toast({
        variant: "default",
        description: res.success,
      });

      router.push("/dashboard");
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <h1 className="hover:underline cursor-pointer decoration-4 underline-offset-8 font-bold hover:decoration-purple-600">
          Sign In
        </h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] s">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>Search your horizon!</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="grid gap-4 py-4 space-y-5 mb-6">
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
                            className="w-full px-3 py-2 border"
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
                            className="w-full px-3 py-2 border"
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
            <Button className="w-full" type="submit">
              Sign In
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default SignIn;
