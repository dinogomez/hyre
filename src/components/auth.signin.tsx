import {
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
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

type SignInSchemaValues = z.infer<typeof SignInSchema>;

function SignIn() {
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

      return redirect("/dashboard");
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <h1 className="hover:underline cursor-pointer decoration-4 underline-offset-8 font-bold hover:decoration-purple-600">
          Sign In
        </h1>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Login</AlertDialogTitle>
          <AlertDialogDescription>Search your horizon!</AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="grid gap-4 py-4 space-y-3">
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
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SignIn;
